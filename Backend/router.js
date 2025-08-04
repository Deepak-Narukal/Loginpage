const express = require("express")
const { Login, Registration, Logout, AuthVerify, SubmitPost, SendPost } = require("./controller")
const router = express.Router()

router.get("/auth", AuthVerify)
router.get("/sendpost", AuthVerify, SendPost)
router.post("/registration", Registration)
router.post("/postcreate", AuthVerify, SubmitPost)
router.post("/login", Login)
router.post("/logout", Logout)

module.exports = { router }