const express = require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

app.use('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: false}));

app.listen(PORT, ADDRESS, () => console.log(`Listening at ${ADDRESS}:${PORT}`));