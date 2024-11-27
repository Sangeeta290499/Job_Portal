import {Company } from "../models/company.model.js"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) =>{ // if we are posting job then we need to create company name also, like in which company in we are postoing job 
    try{
        const {companyName} = req.body;   //here company name will come from request body
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success: false
            });
        }
        let company = await Company.findOne({name:companyName}); //Checking if the Company Already Exists ,here we will find comapany by "comapanyName"
        if(company){ //If a match is found, it means the company is already registered.
            return res.status(400).json({
                message:"You can't register same comapany",
                success: false
            })
        };
        company = await Company.create({ // If the company doesn’t exist,using this line we can create
            name:companyName,
            userId:req.id
        });
        return res.status(201).json({
            message:"Company registered successfully.",
            company,
            success:true
        })
    }catch(error){
        console.log(error);
    }

}
//comapany get bhi krna hoga,register k baad
//yaha saari comapny return ho rahi h
export const getCompany = async (req, res) =>{
    try{
        const userId = req.id; // logged in user id
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    }catch (error){
        console.log(error);
    }
}

//get company by Id
export const getCompanyById = async (req, res) =>{
    try{
        const companyId = req.params.id; //here we will get company id
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company noy found.",
                success: false
            });
        }
        return res.status(200).json({
            company,
            success:true
        })
    } catch(error){
        console.log(error);
    }
}

// update company information
export const updateCompany = async (req, res) =>{
    try{
        const { name, description, website, location} = req.body;
        const file = req.file;
        // idhar cloudinary aaiga
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;


        const updateData = { name, description, website, location, logo};
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true});
        if(!company){
            return res.status(404).json({
                message:"Company not found.",
                succes: false
            });
        }
        return res.status(200).json({
            messgae:"Company information updated.",
            success: true
        })

    }catch (error){
        console.log(error);
    }
}