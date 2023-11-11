import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

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

app.listen(process.env.PORT || 3000, () => {
    console.log(`server connected in a port ${process.env.PORT}`);
})