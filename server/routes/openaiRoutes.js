const express = require('express');
const router = express.Router();

const {addEvent} = require('../controllers/eventController') 
const {aiTest, aiItinerary, aiVenues, aiShopList, aiPlaylist} = require('../controllers/openaiController');

router.get('/aiTest', aiTest, (req, res) => {
    return res.status(200).send(res.response);
})

router.post('/aiItinerary', aiItinerary, addEvent, (req, res) => {
    return res.status(200).send(res.itinResponse);
});

router.get('/aiVenues', aiVenues, (req, res) => {
    return res.status(200).send(res.venueResponse);
})

router.get('/aiShopList', aiShopList, (req, res) => {
    return res.status(200).send(res.shopResponse);
})

router.get('/aiPlaylist', aiPlaylist, (req, res) => {
    return res.status(200).send(res.plResponse);
})

module.exports = router;
