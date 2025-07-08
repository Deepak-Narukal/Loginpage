const mongoose = require("mongoose")
const SchemaTable = new mongoose.Schema({
     username: { type: String, unique: true },
     name: { type: String },
     email: { type: String, unique: true },
     password: { type: String }
})
const data = mongoose.model("Registration", SchemaTable)
module.exports = { data }