import bcrypt from 'bcrypt';
import User from "../models/use.model.js"

export const signup = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const { username, email } = req.body;

    const user = new User({ username, email, password })
    try {
        await user.save();
        res.status(201).send(user);

    } catch (error) {
        res.status(500).json(error.messsage)
    }
}