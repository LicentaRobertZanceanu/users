import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { routes } from './routes.js';
import cors from 'cors';

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

const mongodbUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.h3y2c.mongodb.net/main_DB?retryWrites=true&w=majority`;
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('Connected to MongoDB!'))

app.listen(port, () => {
    routes(app);
    console.log(`server is running on port ${port}`)
})