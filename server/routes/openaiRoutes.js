const express = require('express');
const router = express.Router();

const {aiTest} = require('../controllers/openaiController');

router.get('/aiTest', aiTest, (req, res) => {
    // return res.json({response: response});
})

module.exports = router;