import { openDB } from './configDB.js'

import express from 'express';
import dotenv from 'dotenv'

const app = express();

openDB();

app.set('view engine', 'ejs');
app.use(express.json());

dotenv.config({ path: './.env'});

app.listen(process.env.PORT, process.env.ADDRESS, () => console.log(`Listening at ${process.env.ADDRESS}:${process.env.PORT}`))