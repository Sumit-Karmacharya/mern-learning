const Workout= require('../models/workoutModel.js');
const mongoose = require('mongoose')

//get all workouts
const getWorkout = async(req, res) => {
    const workout = await Workout.find({})
    res.status(200).json (workout)
}

//get workout by id
const getWorkoutById = async(req, res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'Invalid id of the workout'})
    }
    const workout = await Workout.findById(id)

    if(!Workout) {
        res.status(404).json({msg:'Workout not found'})
    }
    res.status(200).json (workout)
}

// Create a new workout
const createWorkout = async(req, res) => {
    const {title, load, reps}= req.body;
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout);
        
    } catch (error) {
        res.status(400).json({error: err.message});
    }
}


//update a workout by id
const updateWorkout = async(req,res) => {
    const {id} = req.params
    // const {title, load, reps} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'Invalid id of the workout'})
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, {...req.body}, {new: true})  //new:true ensures the updated workout is returned 

    if(!workout){
        return res.status(404).json({msg:'Workout not found'})
    }
    res.status(200).json(workout)

}
//delete a workout
const deleteWorkout = async (req, res) =>{
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'Invalid id of the workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(404).json({msg:'Invalid ID'})
    }
    res.status(200).json({msg:'Workout deleted'})
}

module.exports = {
    createWorkout,
    getWorkout,
    getWorkoutById,
    deleteWorkout,
    updateWorkout
    
}