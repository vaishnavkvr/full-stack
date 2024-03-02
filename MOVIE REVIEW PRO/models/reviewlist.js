const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const reviewlistSchema = new Schema(
    {
        ID:{
            type : Number,
            required : true
        },
        username:{
            type : String,
            required : true
        },
        moviename:{
            type : String,
            required : true
        },
        reviewdata:{
            type : String,
            required : true
        }
    }
)

const reviewlist = mongoose.model("reviewlist", reviewlistSchema)
module.exports = reviewlist;