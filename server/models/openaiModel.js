const {Configuration, OpenAIApi} = require("openai");

const {OPENAI_KEY} = process.env;

const config = new Configuration({
    apiKey: OPENAI_KEY
})

const openai = new OpenAIApi(config);

module.exports = {openai}