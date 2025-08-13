require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { data, postModel } = require("./schema")


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
          const { username } = req.user
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
          await userDeatail.save()

          res.status(200).json({ message: "sucess", mainpost })
     } catch (error) {
          res.status(500).json({ err: error.message })
     }
}
const SendPost = async (req, res) => {
     try {
          const { username } = req.user
          const user = await data.findOne({ username }).populate("post")
          if (!user) return res.status(404).json({ message: "No Post Available" })
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
               const JWTtoken = await jwt.sign({ username, userId: findUser._id }, process.env.SECRETKEY)
               res.cookie("token", JWTtoken, {
                    httpOnly: true,
                    secure: false,          // set true only if you are on HTTPS
                    sameSite: "lax",
                    path: "/"

               });
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
          const token = req.cookies.token

          if (!token) {
               return res.status(401).json({
                    message: "No token provided",
                    cookies: req.cookies,  // For debugging
                    headers: req.headers.cookie // For debugging
               })
          }
          const verified = jwt.verify(token, process.env.SECRETKEY)
          req.user = verified
          next()

     } catch (error) {
          if (error.name === 'TokenExpiredError') {
               return res.status(401).json({ message: "Token expired" })
          }
          if (error.name === 'JsonWebTokenError') {
               return res.status(401).json({ message: "Invalid token" })
          }

          res.status(401).json({ message: "Authentication failed" })
     }
}
const Logout = async (req, res) => {
     try {
          const remove = res.clearCookie("token", {
               httpOnly: true,
               secure: false,
               sameSite: "lax",
               path: "/"

          })
          if (remove) {
               return res.status(200).json({ message: "Logout successful" })
          } else {
               return res.status(500).json({ message: "Logout failed" })
          }
     } catch (error) {
          res.status(500).json({
               message: error.message
          })
     }
}
module.exports = { Registration, Login, Logout, AuthVerify, SubmitPost, SendPost }

