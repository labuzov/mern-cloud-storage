import express from "express";
import mongoose from "mongoose";
import config from "config";
import authRouter from "./routes/authRouter.js";
import cors from "cors";
import fileRouter from "./routes/fileRouter.js";


const PORT = config.get('serverPort');
const DB_URL = config.get('dbUrl');

const app = express();


app.use(cors({credentials: true, origin: true}))
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

async function start() {
    try {
        await mongoose.connect(DB_URL);


        app.listen(PORT, () => {
            console.log('Server has been started on port ' + PORT)
        })
    } catch(e) {
        console.log(e)
    }
}

start();

