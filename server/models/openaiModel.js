const OpenAI = require("openai");
require('dotenv').config();

const {OPENAI_KEY} = process.env;

const openai = new OpenAI({
    apiKey: OPENAI_KEY
});

module.exports = openai;