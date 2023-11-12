import bcrypt from 'bcrypt';
import User from "../models/use.model.js"
import jwt from "jsonwebtoken";
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const { username, email } = req.body;

    const user = new User({ username, email, password })
    try {
        await user.save();
        res.status(201).send(user);

    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    try {
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return next(errorHandler(404, "Incorrect email or password"));
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user._doc.password
        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(user)

    } catch (error) {
        next(error)
    }
}