require("dotenv").config()
const express = require("express")
const cookieparsher = require("cookie-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { data } = require("./schema")
const app = express()
app.use(express.json())
app.use(cookieparsher())


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

const Login = async (req, res) => {
     try {
          const { username, password } = req.body
          const findUser = await data.findOne({ username })
          if (findUser) {
               const ismatch = await bcrypt.compare(password, findUser.password)
               if (!ismatch) return res.status(500).json({ Message: "Something Went Wrong!!" })
               const JWTtoken = await jwt.sign(username, process.env.SECRETKEY)
               await res.cookie("Token", JWTtoken)
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

const AuthVerify = async (req, res) => {
     try {
          const cookie = req.cookies.Token
          if (!cookie) {
               return res.status(401).json({ message: "No token provided" });
          }
          const verify = await jwt.verify(cookie, process.env.SECRETKEY)
          if (verify) return res.status(200).json({ message: "You are Credible", verify })
     } catch (error) {
          res.status(500).json({ error: error.messsage })
     }

}

const Logout = async (req, res) => {
     try {
          res.clearcookie(Token)
          res.redirect("/login")
     } catch (error) {
          res.status(500).json({
               message: error.message
          })
     }
}
module.exports = { Registration, Login, Logout, AuthVerify }

