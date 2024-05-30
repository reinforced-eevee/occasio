const {openai} = require('../models/openaiModel.js');
const openaiController = {};

openaiController.aiTest = async () => {

    const prompt = `
        Please give me a list of 5 fruits that grow in the state of Oregon. Return response in the following parsable JSON format:
        {
            "Q": "question",
            "A": "answer"
        }
    `;
    const response = await openai.createCompletion({
        model: "gpt-3.5-turbo-0125",
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.3
    })

    console.log(response.data.choices[0].text);
}

module.exports = openaiController;