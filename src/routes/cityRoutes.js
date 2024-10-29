const express = require("express");
const {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
} = require("../controllers/cityController");

const router = express.Router();

router.post("/city", createCity);
router.get("/city", getCities);
router.get("/city/:id", getCityById);
router.put("/city/:id", updateCity);
router.delete("/city/:id", deleteCity);

module.exports = router;
