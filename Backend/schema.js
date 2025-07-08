const mongoose = require("mongoose")
const SchemaTable = new mongoose.Schema({
     username: { type: String, unique: true, require },
     name: { type: String, require },
     email: { type: String, unique: true, require },
     password: { type: String, require }
})
const data = mongoose.model("Registration", SchemaTable)
module.exports = { data }