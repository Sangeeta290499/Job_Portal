// creating server
import express from "express";
import cookieParser from "cookie-parser"; // it will parse the data coming from frontend so that we see in backend
import cors from "cors";
// import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
dotenv.config({});


const app = express();// here we are calling

app.get("/home", (req, res) =>{
    
    return res.status(200).json({
        message: "I am coming from backend",
        success: true
    })
    });

// use a middleware
app.use(express.json()); //data will come in json format
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

//here all api's will come
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);



app.listen(port, () => {
    connectDB();
    console.log(`Server running at port ${port}`);
})
