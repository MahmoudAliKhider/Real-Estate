import express from 'express';
import { createList, deleteList, updateList, getListing,getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", verifyToken, createList);
router.delete("/delete/:id", verifyToken, deleteList);
router.post("/update/:id", verifyToken, updateList);
router.get("/get/:id", getListing);
router.get("/get", getListings);

export default router;
