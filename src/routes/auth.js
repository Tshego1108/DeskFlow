const express = require('express');
const router = express.Router();
const {login} = require('../controllers/authController');
const {loginValidator} = require('../validators/authValidators');
const {runValidation} = require('../middleware/validate');

// Public: register, login, forgot & reset
router.post('/login', loginValidator, runValidation, login);

module.exports = router;
