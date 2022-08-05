import mongoose from "mongoose";

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    leetcode :{
        type:String,
        required:true
    }
})

const user = mongoose.model('User', schema)
export default user