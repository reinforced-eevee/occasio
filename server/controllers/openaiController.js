const openai = require('../models/openaiModel.js');
const openaiController = {};

openaiController.aiItinerary = async (req, res, next) => {
    const {name, date, type, guest_size, age_range, formality, theme, budget, location} = req.body;

    const itinerary = `
        Please give me an itinerary for an event I am planning, using the following information, if provided.
        name: ${name},
        date: ${date},
        type: ${type},
        guest_size: ${guest_size},
        age_range: ${age_range},
        formality: ${formality},
        theme: ${theme},
        budget: ${budget},
        location: ${location}
    
        Please include a schedule of events with activities, including potential venues in close proximity to the location, playlist to suit the theme and a shopping list for the event that fits the budget.
        Response must be in the following parsable JSON format without formatted spacing or new line characters (\n), as we would save the response as an array of objects in our noSQL database: 
        {
            "name": "event name",
            "date": "event date",
            "activities": [{
                "time_range": "time range of activity e.g. 9am - 10am",
                "activity": "title/ name of activity"
                "activity_details": "details/ description about activity"
            }],
        }
    `
    try {
        const itinResponse = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{"role": "user", "content": itinerary}],
            response_format: { "type": "json_object" },
            temperature: 0.4
        })
        // console.log('Response from openAi, converted to JSON: ', JSON.parse(itinResponse.choices[0].message.content))
        const correctedJson = itinResponse.choices[0].message.content.replace(/}\s*"/g, ',"').replace(/}\s*}/g, '}');
        res.itinResponse = JSON.parse(correctedJson);
        console.log('Itinerary response successful')
        return next();

    } catch(error) {
        const errObj = {
            log: `Error found in openaiController.aiItinerary, openai prompt query, ${error.message}`,
            message: {err: error}
        }
        return next(errObj);
    }
}

openaiController.aiVenues = async (req, res, next) => {
    const {name, date, type, guest_size, age_range, formality, theme, budget, location} = req.body;

    const venuePrompt = `
        Please give me a list of potential venues that actually exist, for an event I am planning, using the following information, if provided.
        name: ${name},
        date: ${date},
        type: ${type},
        guest_size: ${guest_size},
        age_range: ${age_range},
        formality: ${formality},
        theme: ${theme},
        budget: ${budget},
        location: ${location}
    
        Please include a list of potential venues in close proximity to the location.
        Response must be in the following parsable JSON format without formatted spacing or new line characters (\n), as we would save the response as an array of objects in our noSQL database. Response MUST be valid JSON format, thanks: 
        {
            "venues": [{
                "name": "name",
                "address": "address",
                "venue_description": "description"
            }]
        }
    `

    try {
        const venueResponse = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{"role": "user", "content": venuePrompt}],
            response_format: { "type": "json_object" },
            temperature: 0.4
        })
        console.log('Raw venue response:', venueResponse.choices[0].message.content);
        // console.log('Response from openAi, converted to JSON: ', JSON.parse(venueResponse.choices[0].message.content))
        const correctedJson = venueResponse.choices[0].message.content.replace(/}\s*"/g, ',"').replace(/}\s*}/g, '}');
        res.venueResponse = JSON.parse(correctedJson);
        console.log('Venue response successful')
        return next();

    } catch(error) {
        const errObj = {
            log: `Error found in openaiController.aiVenue, openai prompt query, ${error.message}`,
            message: {err: error}
        }
        return next(errObj);
    } 
}

openaiController.aiShopList = async (req, res, next) => {
    const {name, date, type, guest_size, age_range, formality, theme, budget, location} = req.body;

    const shopPrompt = `
        Please generate a shopping list for me with prices and links to items, for an event I am planning, using the following information, if provided. 
        name: ${name},
        date: ${date},
        type: ${type},
        guest_size: ${guest_size},
        age_range: ${age_range},
        formality: ${formality},
        theme: ${theme},
        budget: ${budget},
        location: ${location}
    
        If budget is provided, do not let costs exceed the budget.
        Response must be in the following parsable JSON format without formatted spacing or new line characters (\n), as we would save the response as an array of objects in our noSQL database: 
        {
            "event_name": "name",
            "event_date": "date",
            "shoppingList": [{
                "list_item": "list item name or type of item"
                "item_description": "description of item and why it is useful",
                "estimated_cost": "cost of item, eg. $220",
                "item_link": "url to item for sale, eg. https://www.amazon.com/s?k=first+aid+kit"
            }]
        }
    `

    try {
        const shopResponse = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{"role": "user", "content": shopPrompt}],
            response_format: { "type": "json_object" },
            temperature: 0.4
        })
        // console.log('Response from openAi, converted to JSON: ', JSON.parse(shopResponse.choices[0].message.content))
        
        const correctedJson = shopResponse.choices[0].message.content.replace(/}\s*"/g, ',"').replace(/}\s*}/g, '}');
        res.shopResponse = JSON.parse(correctedJson);
        console.log('Shopping List response successful')
        return next();

    } catch(error) {
        const errObj = {
            log: `Error found in openaiController.aiShopList, openai prompt query, ${error.message}`,
            message: {err: error}
        }
        return next(errObj);
    } 
}

openaiController.aiPlaylist = async (req, res, next) => {
    const {name, date, type, guest_size, age_range, formality, theme, budget, location} = req.body;

    const plPrompt = `
        Please generate a playlist for an event I am planning, using the following information, if provided. 
        name: ${name},
        date: ${date},
        type: ${type},
        guest_size: ${guest_size},
        age_range: ${age_range},
        formality: ${formality},
        theme: ${theme},
        budget: ${budget},
        location: ${location}
    
        Response should include song title, artist, genre and be listed in the order it is meant to be played. Please give at least 10 songs.
        Response must be in the following parsable JSON format without formatted spacing or new line characters (\n), as we would save the response as an array of objects in our noSQL database: 
        {
            "event_name": "name",
            "event_date": "date",
            "playlist_title": "creative title for the playlist",
            "playlist": [{
                "song_title": "title of song"
                "artist": "artist name",
                "genre": "genre of song"
            }]
        }
    `

    try {
        const plResponse = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{"role": "user", "content": plPrompt}],
            response_format: { "type": "json_object" },
            temperature: 0.4
        })
        // console.log('Response from openAi, converted to JSON: ', JSON.parse(plResponse.choices[0].message.content))

        const correctedJson = plResponse.choices[0].message.content.replace(/}\s*"/g, ',"').replace(/}\s*}/g, '}');
        res.plResponse = JSON.parse(correctedJson);
        console.log('Playlist response successful');
        return next();

    } catch(error) {
        const errObj = {
            log: `Error found in openaiController.aiPlaylist, openai prompt query, ${error.message}`,
            message: {err: error}
        }
        return next(errObj);
    } 
}

openaiController.combineData = async (req, res, next) => {

    const fullEvent = {
        aiItinerary: res.itinResponse,
        aiVenues: res.venueResponse,
        aiShoppingList: res.shopResponse,
        aiPlaylist: res.plResponse
    }

    res.fullEvent = fullEvent;
    next();
}

module.exports = openaiController;