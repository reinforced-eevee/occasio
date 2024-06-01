const express = require('express');
const router = express.Router();

const {aiTest} = require('../controllers/openaiController');

router.get('/aiTest', aiTest, (req, res) => {
    // return res.json({response: response});
    return res.status(200).send(res.response);
})

router.get('/newTest', (req, res) => {
    res.status(200).send('OK');
});

module.exports = router;