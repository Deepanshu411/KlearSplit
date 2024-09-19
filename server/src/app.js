import express from 'express';
import "dotenv/config";
import { connectDatabase } from './config/db.connection.js';

const app = express();

connectDatabase();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on the port ${PORT}`);
})