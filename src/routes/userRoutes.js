const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getPaginatedUsers
} = require("../controllers/userController");
const { auth, authorizeRoles } = require("../middleware/auth");
const userValidator = require("../middleware/userValidator");

const router = express.Router();

// Public routes
router.post("/register", userValidator.register, registerUser);
router.post("/login", userValidator.login, loginUser);

// Protected routes
router.get("/users", auth, authorizeRoles("admin"), getAllUsers);
router.get('/users-with-pagination', getPaginatedUsers);
router.put("/users/:id", auth, authorizeRoles("admin"), updateUser); // Update user
router.delete("/users/:id", auth, authorizeRoles("admin"), deleteUser); //

module.exports = router;
