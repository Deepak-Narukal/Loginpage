require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { data } = require("./schema")
const app = express()
app.use(express.json())

const Registration = async (req, res) => {
     try {
          const { password, username, name, email } = req.body
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(password, salt)
          const credentials = await data.create({
               username,
               name,
               email,
               password: hash
          })
          if (credentials) {
               return res.redirect("/login")
          } else {
               return res.alert("Something went Wrong!!!")
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
               console.log(ismatch)
               const JWTtoken = await jwt.sign(username, process.env.SECRETKEY)
               await res.cookie("Token", JWTtoken)
               console.log(JWTtoken)

               await res.redirect("/Dashboard")
          } else {
               throw new Error("Something Went Wrong!!!");

          }


     } catch (error) {
          res.status(500).json({
               message: error.message
          })
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
module.exports = { Registration, Login, Logout }

