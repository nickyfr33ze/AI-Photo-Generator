import * as dotenv from 'dotenv'; // updated import to reflect new package name (dotenv -> dotenv) in 10.0.0
dotenv.config(); // updated to reflect new package name (dotenv -> dotenv) in 10.0.0

import OpenAI from 'openai'; // updated import to reflect new package name (openai-api -> openai) in 4.0.0
const openai = new OpenAI({  // creates the var 'openai' from OpenAI pkg
    apiKey: process.env.OPENAI, // sets the api key to the environment variable
}); 

import express from 'express'; // updated import to reflect new package name (express -> express) in 4.0.0
import cors from 'cors'; // updated import to reflect new package name (cors -> cors) in 2.8.5

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
    try{
    const prompt = req.body.prompt;
    const aiResponse = await openai.images.generate({ // changed from 'openai.createImage'
        prompt,
        n: 1,
        size: '1024x1024',
    });
    const image = aiResponse.data.data[0].url;
    res.send({ image });
    } 
    catch(err) {
        console.error(err);
        res.status(500).send({ error: err.message || 'Something went wrong.' });
    }
});

app.listen(8080, () => console.log('Server running on http://localhost:8080/dream'));