import express from 'express';
const router = express.Router();
import {  signup, login,google,signOut } from '../controllers/auth.controller.js';

router.post("/signup", signup)
router.post("/login", login)
router.post("/google", google)
router.get("/signout", signOut)

export default router;