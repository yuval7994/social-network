const router = require('express').Router(); 

const {
    getAllThought,
    getThoughtById,
    deleteThought, 
    createThought, 
    updateThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller'); 

router 
.route('/')
.get(getAllThought)
.post(createThought)

router
.route('/:id')
.get(getThoughtById)
.delete(deleteThought)
.put(updateThought)

router 
.route('/:id/reactions')
.post(addReaction)
.delete(deleteReaction)

module.exports = router; 

