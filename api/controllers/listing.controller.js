import Listen from '../models/listing.model.js';

export const createList = async (req, res, next) => {
    try {
        const listen = await Listen.create(req.body);
        res.status(201).json(listen);
    } catch (error) {
        next(error)
    }
}