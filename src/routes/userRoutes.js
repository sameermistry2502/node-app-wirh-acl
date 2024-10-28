const express = require('express');
const { registerUser, loginUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { auth, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/users', auth, authorizeRoles('admin'), getAllUsers);
router.put('/users/:id', auth, authorizeRoles('admin'), updateUser);  // Update user
router.delete('/users/:id', auth, authorizeRoles('admin'), deleteUser); //

module.exports = router;
