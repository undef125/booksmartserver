const User = require("../models/userModel");
const OTPv = require("../models/otpmodel");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const token = require("../models/token");
const nodemailer = require("nodemailer");
dotenv.config({ path: "../.env" }); //giving location of .env file
const otpGenerator = require("otp-generator"); //generating random otp
//using googleapis
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
);
OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

//sendmail function
const sendMail = async (email, otp) => {
    //generating access token
    const accessToken = OAuth2Client.getAccessToken();
    //configuring mail transporter
    let mailtransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.OUR_EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });
    //options for mailing
    const mailOption = {
        from: process.env.OUR_EMAIL,
        to: email,
        subject: "Book-S-Mart SignUp OTP",
        text: `Your otp verification code is ${otp}. Thank you from our team Bit Believers!`,
    };

    //sending mail
    await mailtransporter.sendMail(mailOption, (error, res) => {
        if (error) {
            return error;
        } else {
            return result;
        }
        // mailtransporter.close();
    });
};

//get otp and send mail and store temporarily in database
const sendOTP = async (req, res) => {
    let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: true,
        specialChars: false,
    });

    const storeOTP = new OTPv({
        otp: otp,
        email: req.body.email,
    });

    //checking if username already exist
    let usernameCheck = await User.findOne({ name: req.body.name });
    if (usernameCheck) {
        return res.status(400).send({ message: "username already exists!" });
    } else {
        let emailCheck = await User.findOne({ email: req.body.email });
        if (emailCheck)
            return res.status(400).send({ message: "email already exists!" });
    }
    //delete old otp if exists
    await OTPv.deleteOne({ email: req.body.email });
    try {
        sendMail(req.body.email, otp);
        res.send("succeed");
        await storeOTP.save();
    } catch (err) {
        console.log("error from here: " + err);
    }
};

//signing up the user
const signUpUser = async (req, res) => {
    //hashing and salting password for security reasons
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(req.body.password, salt); //value of salt is 10 by default

    //signing up the user
    try {
        let otpCompareData = await OTPv.findOne({ email: req.body.email });
        let checkOTP = otpCompareData.otp;
        if (checkOTP === req.body.otp) {
            //checks if otp matches or not
            let user = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            };
            let newUser = new User(user);
            await newUser.save();
            await OTPv.deleteOne({ email: req.body.email });
            return res
                .status(200)
                .send({ message: "User Signed Up Successfully!" });
        } else {
            return res.status(400).send({ message: "OTP verification failed" });
        }
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Couldnot sign up some network error!" });
    }
};

//login user
const loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ message: "Invalid Email" });
        } else {
            let passMatch = await bcrypt.compare(req.body.password, user.password);
            console.log(passMatch)
            if (passMatch) {
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '90m'});
                // const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)
    
                // const newToken = new token({token: refreshToken});
                // await newToken.save();
                // return res.status(200).send({ message: "login success" , accessToken: accessToken,refreshToken:refreshToken, name: user.name, email: user.email});
                return res.status(200).json({ message: "login success" , accessToken: accessToken, name: user.name, email: user.email, id:user._id});
            } else {
                return res.status(400).send({ message: "Invalid Password" });
            }
        }
    } catch (err) {
        return res.status(400).send({ message: err });
    }
};

const getUsers = async(req,res) => {
    let user = await User.findOne({ _id: req.params.userid});
    return res.status(200).send(user);
}

const delRefToken = async(req,res) => {
    const del = await token.deleteOne({token: req.body.token});
}


module.exports = { loginUser, signUpUser, sendOTP, delRefToken , getUsers};
