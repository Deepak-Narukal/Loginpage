require("dotenv").config()
const mongoose = require("mongoose")
const ConnectDB = () => {
     mongoose.connect(process.env.MONGOSERVER).then(() => (console.log("DB Connected!!")))
}

module.exports = ConnectDB