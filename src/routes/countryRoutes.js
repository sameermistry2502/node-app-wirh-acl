const express = require('express');
const { createCountry, getCountries, getCountryById, updateCountry, deleteCountry } = require('../controllers/countryController');

const router = express.Router();

router.post('/countries', createCountry);
router.get('/countries', getCountries);
router.get('/countries/:id', getCountryById);
router.put('/countries/:id', updateCountry);
router.delete('/countries/:id', deleteCountry);

module.exports = router;
