const express = require('express');
const router = express.Router();

const {syntaxErrorTests} = require('tuba-tracing');

const {aiTest, aiItinerary, aiVenues} = require('../controllers/openaiController');

router.get('/aiTest', aiTest, (req, res) => {
    return res.status(200).send(res.response);
})

router.get('/aiItinerary', aiItinerary, (req, res) => {
    return res.status(200).send(res.itinResponse);
});

router.get('/aiVenues', aiVenues, (req, res) => {
    return res.status(200).send(res.venueResponse);
})

// router.get('aiShoppingList', aiShopList, (req, res) => {
//     return res.status(200).send(res.shopResponse);
// })

// router.get('aiPlaylist', aiPlaylist, (req, res) => {
//     return res.status(200).send(res.shopResponse);
// })

router.get('/tubaTest', (req, res) => {
  syntaxErrorTests();
  res.status(200).send('Test successful')
})

module.exports = router;