import express from 'express';
import { createList, deleteList, updateList } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", verifyToken, createList);
router.delete("/delete/:id", verifyToken, deleteList);
router.post("/update/:id", verifyToken, updateList)

export default router;
