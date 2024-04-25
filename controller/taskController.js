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

exports.putTask = async (req, res) => {
    try {
      const { description } = req.body;
      if (!description) {
        return res.status(400).json({ status: false, msg: "Description of task not found" });
      }
  
      if (!validateObjectId(req.params.taskId)) {
        return res.status(400).json({ status: false, msg: "Task id not valid" });
      }
  
      let task = await Task.findById(req.params.taskId);
      if (!task) {
        return res.status(400).json({ status: false, msg: "Task with given id not found" });
      }
  
      if (task.user != req.user.id) {
        return res.status(403).json({ status: false, msg: "You can't update task of another user" });
      }
  
      task = await Task.findByIdAndUpdate(req.params.taskId, { description }, { new: true });
      res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  }


exports.deleteTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
    }

    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ status: true, msg: "Task deleted successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}