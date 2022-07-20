const router = require('express').Router(); 

const {
    getAllUser, 
    getUserById,
    createUser,
    deleteUser, 
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller'); 

router 
.route('/')
.get(getAllUser)
.post(createUser);

router
.route('/:id')
.get(getUserById)
.delete(deleteUser)
.put(updateUser)

router 
.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)
module.exports = router; 