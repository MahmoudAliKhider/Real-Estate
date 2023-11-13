import express from 'express';

import { updateUser, userDelete } from "../controllers/user.controller.js"
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.post("/delete/:id", verifyToken, userDelete);

export default router;