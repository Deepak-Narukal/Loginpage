const express = require("express")
const { Login, Registration, Logout, AuthVerify } = require("./controller")
const router = express.Router()

router.post("/registration", Registration)
router.post("/login", Login)
router.get("/auth", AuthVerify)
router.post("/logout", Logout)

module.exports = { router }