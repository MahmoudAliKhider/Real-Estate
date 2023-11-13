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

export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-4),
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };

  
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};