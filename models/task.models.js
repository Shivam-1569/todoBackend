
import mongoose from 'mongoose'
import { User } from './user.models.js'

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    isCompleted:{
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps:true})

export const Task = mongoose.model("Task", taskSchema)