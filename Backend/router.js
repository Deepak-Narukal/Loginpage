const express = require("express")
const { Login, Registration, Logout, AuthVerify, SubmitPost, SendPost } = require("./controller")
const router = express.Router()

router.post("/registration", Registration)
router.post("/login", Login)
router.post("/postcreate", AuthVerify, SubmitPost)
router.get("/sendpost", AuthVerify, SendPost)
router.post("/logout", AuthVerify, Logout)

module.exports = { router }