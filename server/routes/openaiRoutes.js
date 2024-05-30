const express = require('express');
const router = express.Router();

const {aiTest} = require('../controllers/openaiController');

router.get('/openaiTest', aiTest, (req, res) => {

})