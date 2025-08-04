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
          const { username } = res.user
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
          const { username } = res.user
          const user = await data.findOne({ username }).populate("post")
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
               const JWTtoken = await jwt.sign({ username, userId: findUser._id }, process.env.SECRETKEY)
               console.log(JWTtoken)  //delete after use
               res.cookie("token", JWTtoken, {
                    httpOnly: true,
                    secure: false,          // set true only if you are on HTTPS
                    sameSite: "lax"

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
          console.log("🔐 AuthVerify called")
          console.log("🍪 All cookies:", req.cookies)
          console.log("📋 Cookie header:", req.headers.cookie)

          const token = req.cookies.token

          if (!token) {
               console.log("❌ No token found in cookies")
               return res.status(401).json({
                    message: "No token provided",
                    cookies: req.cookies,  // For debugging
                    headers: req.headers.cookie // For debugging
               })
          }

          console.log("🎫 Token found:", token.substring(0, 20) + "...")

          const verified = jwt.verify(token, process.env.SECRETKEY)
          console.log("✅ Token verified:", verified)

          req.user = verified

          // If this is the /auth endpoint, send success response
          if (req.method === 'GET' && req.path === '/auth') {
               return res.status(200).json({
                    message: "Authenticated",
                    user: verified
               })
          }

          next()

     } catch (error) {
          console.error("❌ Auth verification error:", error.message)

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
          res.clearcookie("token")
     } catch (error) {
          res.status(500).json({
               message: error.message
          })
     }
}
module.exports = { Registration, Login, Logout, AuthVerify, SubmitPost, SendPost }

