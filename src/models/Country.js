const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true } // Optional ISO code
});

module.exports = mongoose.model('Country', countrySchema);
