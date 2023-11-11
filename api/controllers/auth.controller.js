import bcrypt from 'bcrypt';
import User from "../models/use.model.js"

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
            res.status(401).send("Incorrect email or password");
        }
        delete user.password;
        res.status(200).json({ data: user });
    } catch (error) {
        next(error)

    }

}