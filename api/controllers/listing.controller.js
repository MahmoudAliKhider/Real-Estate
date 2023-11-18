import Listing from '../models/listing.model.js';
import Listen from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createList = async (req, res, next) => {
    try {
        const listen = await Listen.create(req.body);
        res.status(201).json(listen);
    } catch (error) {
        next(error)
    }
}

export const deleteList = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing Not Found'))
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can Only Delete Your Own Listing'))
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(201).json('Listing Delete Success');
    } catch (error) {
        next(error)
    }

}

export const updateList = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing Not Found'))
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can Only Delete Your Own Listing'))
    }
    try {
        const updateListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(201).json(updateListing)
    } catch (error) {
        next(error)
    }
}