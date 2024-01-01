import * as dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai'; // updated import to reflect new package name (openai-api -> openai) in 4.0.0
const openai = new OpenAI({ 
    apiKey: process.env.OPENAI,
});

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
    const prompt = req.body.prompt;
    const aiResponse = await openai.images.generate({ // changed from 'openai.createImage'
        prompt,
        n: 1,
        size: '1024x1024',
    });

    const image = aiResponse.data.data[0].url;
    res.send({ image });
});

app.listen(8080, () => console.log('Server running on https://localhost:8080/dream'));