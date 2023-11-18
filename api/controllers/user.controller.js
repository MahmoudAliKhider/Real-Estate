import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js'
import User from '../models/use.model.js'
import bcrypt from 'bcrypt';

export const test = (req, res) => {
    res.json({
        message: 'Api route is working!',
    });
};


export const updateUser = async (req, res, next) => {

    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'you can only update own Account'));

    try {
        if (req.body.password) {
            req.body.password = bcrypt.hash(req.body.password, 10)
        }
        const updateUser = await User.findByIdAndUpdate(
            req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true })

        const { password, ...rest } = updateUser._doc

        res.status(200).json(rest)
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export const userDelete = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'you can only update own Account'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(201).json("User Has been Deleted");
    } catch (error) {
        next(error)
    }
}

export const getUserListing = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listing = await Listing.find({ userRef: req.params.id })
            res.status(201).json(listing);
        } catch (error) {
            next(error)
        }
    } else {
        return next(errorHandler(401, 'You Can Only View your own Listing'));
    }
}

export const getUser = async (req, res, next) => {
    try {
      
      const user = await User.findById(req.params.id);
    
      if (!user) return next(errorHandler(404, 'User not found!'));
    
      const { password: pass, ...rest } = user._doc;
    
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };