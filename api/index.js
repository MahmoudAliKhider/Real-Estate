import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();
dotenv.config();

app.use(express.json());

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

app.listen(process.env.PORT || 3000, () => {
    console.log(`server connected in a port ${process.env.PORT}`);
})