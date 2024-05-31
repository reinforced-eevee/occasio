const openai = require('../models/openaiModel.js');
const openaiController = {};

openaiController.aiTest = async (req, res, next) => {
    console.log('entered ai controller')

    const prompt = "Please tell me what your favorite color is?"

    // const prompt = `
    //     Please give me a list of 5 fruits that grow in the state of Oregon. Return response in the following parsable JSON format:
    //     {
    //         "Q": "question",
    //         "A": "answer"
    //     }
    // `;

    try {
        console.log('Entered try block line 15')

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [{"role": "user", "content": prompt}]
            // prompt: prompt,
            // max_tokens: 100,
            // temperature: 0.3
        })

        console.log('Response from openai: ', response.choices[0].message);
        // console.log('Response from openai: ', response);
        // res.response = response;
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