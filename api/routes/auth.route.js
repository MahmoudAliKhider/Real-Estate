import express from 'express';
const router = express.Router();
import { signup } from '../controllers/auth.controller.js';
import { login } from '../controllers/auth.controller.js';
router.post("/signup",signup)
router.post("/login",login)

export default router;