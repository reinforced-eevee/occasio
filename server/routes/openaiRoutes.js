const express = require('express');
const router = express.Router();

const {addEvent} = require('../controllers/eventController') 
const {aiItinerary, aiVenues, aiShopList, aiPlaylist, combineData} = require('../controllers/openaiController');


router.post('/createEvent', aiItinerary, aiVenues, aiShopList, aiPlaylist, combineData, (req, res) => {
    console.log('Full openai response: ', res.fullEvent)
    return res.status(200).send(res.fullEvent);
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
