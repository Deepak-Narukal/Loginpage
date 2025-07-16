require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { data, postModel } = require("./schema")
const app = express()
app.use(express.json())
app.use(cookieParser())


const Registration = async (req, res) => {
     try {
          const { username, name, email, password } = req.body
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(password, salt)
          const credentials = await data.create({
               username,
               name,
               email,
               password: hash
          })
          if (credentials) {
               return res.status(200).json({ credentials })
          } else {
               return res.send("Something went Wrong!!!")
          }



     } catch (error) {
          res.status(500).json({ message: error.message })
     }
}
const SubmitPost = async (req, res) => {
     try {
          const username = "LalitSSC"
          const userDeatail = await data.findOne({ username })
          if (!userDeatail) {
               return res.status(404).json({ message: "User Not Found!!!" })
          }
          const { content } = req.body
          const mainpost = await postModel.create({
               user: userDeatail._id,
               content: content
          })


          await userDeatail.post.push(mainpost._id)

          res.status(200).json({ message: "sucess", mainpost })
     } catch (error) {
          res.status(500).json({ err: error.message })
     }
}
const SendPost = async (req, res) => {
     try {
          const user = await data.findOne({ username: "LalitSSC" }).populate("post")
          if (!user) return res.status(404).json({ message: "USer not Found" })
          res.status(200).json({ user: user })
     } catch (error) {
          res.status(500).json({ error })
     }
}
const Login = async (req, res) => {
     try {
          const { username, password } = req.body
          const findUser = await data.findOne({ username })
          if (findUser) {
               const ismatch = await bcrypt.compare(password, findUser.password)
               if (!ismatch) return res.status(500).json({ Message: "Something Went Wrong!!" })
               const JWTtoken = await jwt.sign({ username }, process.env.SECRETKEY)
               res.cookie("token", JWTtoken)
               res.status(200).json({ findUser })
          } else {
               throw new Error("Something Went Wrong!!!");

          }


     } catch (error) {
          res.status(500).json({
               message: error.message
          })
     }
}
const AuthVerify = async (req, res, next) => {
     try {
          const token = req.cookies.token;
          console.log("Token from cookie:", token);
          console.log("Cookies received:", req.cookies) // Add this


          if (!token) {
               return res.status(401).json({ message: "No token provided" });
          }

          const verified = jwt.verify(token, process.env.SECRETKEY);
          console.log("Verified token payload:", verified);

          req.user = verified; // Attach user data to request for further use

          next();
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};
const Logout = async (req, res) => {
     try {
          res.clearcookie("token")
     } catch (error) {
          res.status(500).json({
               message: error.message
          })
     }
}
module.exports = { Registration, Login, Logout, AuthVerify, SubmitPost, SendPost }

