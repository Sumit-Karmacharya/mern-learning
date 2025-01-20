const express = require('express');
const { createWorkout, getWorkout, getWorkoutById, deleteWorkout, updateWorkout } = require('../controllers/workoutController');


const router = express.Router();

router.get('/',getWorkout)

router.get('/:id', getWorkoutById);



router.patch('/:id', updateWorkout);

router.delete('/:id', deleteWorkout)

router.post('/', createWorkout)


module.exports = router;