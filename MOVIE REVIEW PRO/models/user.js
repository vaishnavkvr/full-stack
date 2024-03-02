const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        ID:{
            type : Number,
            required : true
        },
        name:{
            type : String,
            required : true
        },
        email:{
            type : String,
            required : true
        },
        passwd:{
            type : String,
            required : true
        }
    }
)

const user = mongoose.model("user", userSchema)
module.exports = user;