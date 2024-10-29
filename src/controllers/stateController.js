const State = require("../models/State");

// Create State
exports.createState = async (req, res) => {
  try {
    const state = new State(req.body);
    await state.save();
    res.status(201).json(state);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All States
exports.getStates = async (req, res) => {
  try {
    const states = await State.find().populate("country");
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get States by ID
exports.getStateById = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);
    if (!state) return res.status(404).send("State not found");
    res.json(state);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update State
exports.updateState = async (req, res) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!state) return res.status(404).send("State not found");
    res.json(state);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete State
exports.deleteState = async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) return res.status(404).send("State not found");
    res.send("State deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
