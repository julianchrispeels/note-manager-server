import express from 'express';
import cors from 'cors';

import { CLIENT_URL } from './config/config.js';
import router from './routes/notes.routes.js';

const app = express();

const allowedOrigins = [CLIENT_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('Request blocked by CORS policy for origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // allow cookies to be sent
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/notes', router);
app.get('/*', (req, res) => {
    res.status(404).json({ error: "Route not found" });
});

export default app;