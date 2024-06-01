const express = require('express');
const router = express.Router();

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

router.get('aiShoppingList', aiShopList, (req, res) => {
    return res.status(200).send(res.shopResponse);
})

// router.get('aiPlaylist', aiPlaylist, (req, res) => {
//     return res.status(200).send(res.shopResponse);
// })

module.exports = router;