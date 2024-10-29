const express = require("express");
const {
  createState,
  getStates,
  getStateById,
  updateState,
  deleteState,
} = require("../controllers/stateController");

const router = express.Router();

router.post("/states", createState);
router.get("/states", getStates);
router.get("/states/:id", getStateById);
router.put("/states/:id", updateState);
router.delete("/states/:id", deleteState);

module.exports = router;
