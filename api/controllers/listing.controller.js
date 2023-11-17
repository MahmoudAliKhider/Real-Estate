import Listen from '../models/listing.model.js';

export const createList = async(req,res)=>{
    try {
        const listen = await Listen.create(req.body);
        res.status(200).json(listen);
    } catch (error) {
        console.log(error)
    }
}