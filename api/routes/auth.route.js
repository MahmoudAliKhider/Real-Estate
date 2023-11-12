import express from 'express';
const router = express.Router();
import {  signup, login,google } from '../controllers/auth.controller.js';

router.post("/signup", signup)
router.post("/login", login)
router.post("/google", google)

export default router;