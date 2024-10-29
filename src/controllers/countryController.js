const Country = require('../models/Country');

// Create Country
exports.createCountry = async (req, res) => {
  try {
    const country = new Country(req.body);
    await country.save();
    res.status(201).json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Countries
exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Country by ID
exports.getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).send('Country not found');
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Country
exports.updateCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!country) return res.status(404).send('Country not found');
    res.json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Country
exports.deleteCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) return res.status(404).send('Country not found');
    res.send('Country deleted');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
