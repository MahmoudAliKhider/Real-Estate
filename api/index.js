import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listenRouter from "./routes/listing.controller.js";
import path from 'path';

const __dirname = path.resolve();

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB Connetion Successfull");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listenRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`server connected in a port ${process.env.PORT}`);
})