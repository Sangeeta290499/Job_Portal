import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async (req,res) => { //if any 0f the data is missing , return an error message.
    try{
        const{fullname, email, phoneNumber, password, role} = req.body;
       
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success: false
            });
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


        const user = await User.findOne({email}); // check if user is already register or not----through email it will check
        if(user){
            return res.status(400).json({
                message:'User already exist with this email',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ //User.create() is called to add a new user document to the database with fullname, email, phoneNumber, and role.
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message:"Account created successfully.",
            success: true
        });
    } catch(error){
        console.log(error);
    }
}

export const login = async (req, res) =>{
    try{ //if any 0f the data is missing , return an error message.
        const { email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email }); // check if user is already register or not----through email it will check
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password); // here we will match password with user password
        if(!isPasswordMatch) {
            return res.status(400).json({
                message:"Incorrect email or password.",
                success: false,
            })
        };
        //check role is correct or not
        if(role != user.role){
            return res.status(400).json({
                message: "Account doesn't exit with current role.",
                success:false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn:'1d'});

        user = {
            _id : user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token", token, {maxAge:1 * 24 * 60 * 60 * 1000, httpsOnly:true, sameSite:'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
        })
    } catch (error){
        console.log(error);
    }
}

export const logout = async (req,res) =>{
    try{
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out Succesfully.",
            success:true
        })
    } catch(error){
        console.log(error);
    }
}

export const updateProfile = async (req, res) =>{
    try{
        const {fullname, email, phoneNumber,bio, skills} = req.body;
        const file = req.file;

        // cloudinary aaiga idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
       


        let skillsArray;
        if(skills){
          skillsArray = skills.split(",");
        }
        const userId = req.id; // it will come from middleware authentication
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"User not found.",
                success:false
            })
        }

        //updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio)  user.profile.bio = bio
        if(skillsArray) user.profile.skills = skillsArray

        //resume comes later here
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }

        await user.save();

        user = {
            _id : user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:"Profile updated Successfully",
            user,
            success: true
        })
    } catch(error){
        console.log(error);
    }
}