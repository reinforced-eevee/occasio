const express = require('express');
const router = express.Router();

const {aiItinerary, aiVenues, aiShopList, aiPlaylist, combineData} = require('../controllers/openaiController');


router.get('/createEvent', aiItinerary, aiVenues, combineData, (req, res) => {
    console.log('Full openai response: ', res.fullEvent)
    return res.status(200).send(res.fullEvent);
})

router.get('/aiItinerary', aiItinerary, (req, res) => {
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