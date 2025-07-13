require("dotenv").config()
const express = require("express")
const cors = require("cors")
const ConnectDB = require("./connection")
const { router } = require("./router")
const app = express()

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/", router)

const hogya = async () => {
     app.listen(process.env.PORT)
     await ConnectDB()
     console.log("conncet")
}
hogya()