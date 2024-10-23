const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');
const { auth, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/users', auth, authorizeRoles('admin'), getAllUsers);

module.exports = router;
