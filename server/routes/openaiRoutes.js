const express = require('express');
const router = express.Router();

const {aiTest, aiItinerary, aiVenues, aiShopList, aiPlaylist} = require('../controllers/openaiController');


router.get('/createEvent', aiItinerary, aiVenues, aiShopList, aiPlaylist, (req, res) => {
    console.log('Full openai response: ', res.openai)
    return res.status(200).send(res.openai);
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

// router.get('/aiTest', aiTest, (req, res) => {
//     return res.status(200).send(res.testResponse);
// })

module.exports = router;