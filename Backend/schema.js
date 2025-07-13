const mongoose = require("mongoose")
const SchemaTable = new mongoose.Schema({
     username: { type: String, unique: true },
     name: { type: String },
     email: { type: String, unique: true },
     password: { type: String },
     post: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserPosts" }]
})

const postSchema = new mongoose.Schema({
     user: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
     date: { type: Date, default: Date.now() },
     content: String,
     likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Registration" }]
})
const data = mongoose.model("Registration", SchemaTable)
const postModel = mongoose.model("UserPosts", postSchema)
module.exports = { data, postModel }