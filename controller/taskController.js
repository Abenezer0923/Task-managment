const Task = require('../models/task');


exports.getTask = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user.id});
        res.status(201).json({tasks, status:true, msg:"Tasks Found"})
    }catch(err){
        console.error("the error is", err);
        return res.status(500).json({ status:false, msg:"Internal Server error!!"})
    }
}
exports.createTask = async (req, res) => {
    try {
        const {description } = req.body
        if (!description){
            return res.status(400).json({status:false, msg:"The Description of task is not found"})
        }
        const task = await Task.create({user:req.user.id, description});
        res.status(201).json({task, status:true, msg:"Tasks create successfully!!!"})
    }catch(err){
        console.error("the error is", err);
        return res.status(500).json({ status:false, msg:"Internal Server error!!"})
    }
}

exports.getTask = async (req, res) => {
    try {
        const tasks = await Task.find({user:req,user,id});
        res.status(200).json({ tasks, status:true, msg:"Task is Found"})
    }catch(err){
        console.error("the error is", err);
        return res.status(500).json({ status:false, msg:"Internal Server error!!"})
    }
}