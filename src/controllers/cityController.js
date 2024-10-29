const City = require("../models/City");

// Create City
exports.createCity = async (req, res) => {
  try {
    const city = new City(req.body);
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Cities
exports.getCities = async (req, res) => {
  try {
    const cities = await City.find().populate("state");
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Cities by ID
exports.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).send("State not found");
    res.json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update city
exports.updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!city) return res.status(404).send("State not found");
    res.json(city);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete city
exports.deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return res.status(404).send("City not found");
    res.send("City deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
