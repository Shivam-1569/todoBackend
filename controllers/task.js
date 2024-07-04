import { Task } from "../models/task.models.js"
import ErrorHandler from "../middlewares/error.middleware.js"

export const newTask = async(req, res, next)=>{
    const {title, description } = req.body
    if(!title || !description){
        return next(new ErrorHandler("Please provide title and description", 404))
    }
    await Task.create({
        title,
        description,
        user: req.user
    })
    
    res.status(400).json({
        title,
        description,
        user: req.user
    })
}

export const allTasks  = async(req, res, next)=>{
    const userId = req.user._id
    const tasks = await Task.find({user: userId})

    res.status(400).json({
        success: true,
        tasks
    })
}

export const updateTask  = async(req, res, next)=>{
    
    const task = await Task.findById(req.params.id)
    if(!task){
        return next(new ErrorHandler("Task Not found", 404))
    }
    task.isCompleted = !task.isCompleted  
    await task.save()
    res.status(400).json({
        success: true,
        message: "updated successfully",
        task: task
    })
}

export const deleteTask = async(req, res, next)=>{
   
    const task = await Task.findById(req.params.id)
    if(!task){
        return next(new ErrorHandler("Task Not found", 404))
    }
    await task.deleteOne()
    

    res.status(400).json({
        success: true,
        message: "deleted successfully"
    })
}