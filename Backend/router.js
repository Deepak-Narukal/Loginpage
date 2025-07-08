const express = require("express")
const { Login, Registration, Logout } = require("./controller")
const router = express.Router()

router.get("/login", Login)
router.post("/registration", Registration)
router.post("/logout", Logout)

module.exports = { router }