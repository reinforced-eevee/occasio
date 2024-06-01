const express = require('express');
const router = express.Router();

const {aiTest, aiItinerary, aiVenue} = require('../controllers/openaiController');

router.get('/aiTest', aiTest, (req, res) => {
    return res.status(200).send(res.response);
})

router.get('/aiItinerary', aiItinerary, (req, res) => {
    return res.status(200).send(res.itinResponse);
});

router.get('/aiVenues', aiVenue, (req, res) => {
    return res.status(200).send(res.venueResponse);
})

// router.get('aiShoppingList', aiShopList, (req, res) => {
//     return res.status(200).send(res.shopResponse);
// })

// router.get('aiPlaylist', aiPlaylist, (req, res) => {
//     return res.status(200).send(res.shopResponse);
// })

module.exports = router;