const Task = require("../models/Task");

const getTasks = async (req, res) => {
      try{
            const tasks = await Task.find();
            console.log("Fetched tasks:", tasks);
            res.status(200).json(tasks);
      } catch(error){
            res.status(500).json({message: "Fail to get tasks"});
      }
}

const getTaskById = async (req, res) => {
      try{
            const task = await Task.findById(req.params.id);
            if(!task){
                  return res.status(404).json({message: "Task not found"});
            }
            res.status(200).json(task);
      } catch(error){
            res.status(500).json({message: "Task not found"});
      }
}

const createTask = async (req, res) => {
      try{
            const {title, description} = req.body;

            if(!title){
                  return res.status(400).json({message: "Title is required"});
            }

            const task = await Task.create({title, description});
            
            res.status(201).json({message: "Task created successfully"});
      } catch(error){
            res.status(500).json({message: "Fail to create task"});
      }
}

const updateTask = async (req, res) => {
      try{
            const {title, description, completed} = req.body;
            const task = await Task.findByIdAndUpdate(req.params.id, {title, description, completed}, {new: true});
            if(!task){
                  return res.status(404).json({message: "Task not found"});
            }
            res.status(200).json({message: "Task updated successfully"});
      } catch(error){
            res.status(500).json({message: "Fail to update task"});
      }
}

const deleteTask = async (req, res) => {
      try{
            const task = await Task.findByIdAndDelete(req.params.id);
            if(!task){
                  return res.status(404).json({message: "Task not found"});
            }
            res.status(200).json({message: "Task deleted successfully"});
      } catch(error){
            res.status(500).json({message: "Fail to delete task"});
      }
}

module.exports = {
      getTasks,
      getTaskById,
      createTask,
      updateTask,
      deleteTask
}