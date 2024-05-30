const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.get('/serverTest', (req, res) => {
    res.json({response: 'Hey buddy, I exist =)'})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});