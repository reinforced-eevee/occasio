const openai = require('../models/openaiModel.js');
const openaiController = {};

openaiController.aiTest = async (req, res, next) => {
    console.log('entered ai controller')
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

    const venuePrompt = `
        Please give me a list of potential venues for a kids birthday party in Philadelphia, in the following parsable JSON format without formatted spacing or new line characters such as \n, as we would save the response as an array of objects in our noSQL database: 
        {
            "venues": [{
                "name": "name",
                "address": "address"
            }]
        }
    `

    try {
        console.log('Entered try block line 15')

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [{"role": "user", "content": itinerary}]
            // prompt: prompt,
            // max_tokens: 100,
            // temperature: 0.3
        })

        // console.log('Response from openai: ', response.choices[0].message);
        console.log('Convert to JSON, ', JSON.parse(response.choices[0].message.content))
        res.response = JSON.parse(response.choices[0].message.content);
        return next();

    } catch (error) {
        const errObj = {
            log: `Error found in openaiController.aiTest, openai prompt query, ${error.message}`,
            message: {err: error}
        }
        return next(errObj);
    }
}

module.exports = openaiController;