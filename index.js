import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3000;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.send("This is a nodemailer back-end server")
});
app.post("/emailSend", (req, res)=>{
    const {name, mail, phone, msg} = req.body;
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user: process.env.USERMAILID,
            pass: process.env.PASSWORD,
        }
    });
    let getMSg = {
        from : process.env.USERMAILID,
        to : mail,
        subject : "Job Apply Application",
        text : `My name is ${name} and my mail and phone number is ${mail} ${phone} and ${msg}`,
    };
    transporter
    .sendMail(getMSg)
    .then((userInfo) =>{
        console.log("User has successfully send mail with the help nodemailer and user details is ", userInfo);
        
    })

    return res.status(200).json({success : true})
});

app.listen(PORT, ()=>{
    console.log("Our server is successfully connected on the port of ", PORT);
});