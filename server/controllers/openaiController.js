const {openai} = require('../models/openaiModel.js');
const openaiController = {};

openaiController.aiTest = async (req, res, next) => {
    console.log('entered ai controller')

    const prompt = `
        Please give me a list of 5 fruits that grow in the state of Oregon. Return response in the following parsable JSON format:
        {
            "Q": "question",
            "A": "answer"
        }
    `;
    try {
        const response = await openai.createCompletion({
            model: "gpt-3.5-turbo-0125",
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.3
        })

        console.log('Response from openai: ', response.data.choices[0].text);
        // res.response = response;
        return next();

    } catch (error) {
        const errObj = {
            log: "Error found in openaiController.aiTest, openai prompt query",
            message: {err: error}
        }
        return next(errObj);
    }
}

module.exports = openaiController;