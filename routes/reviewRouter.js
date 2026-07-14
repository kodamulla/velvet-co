import express from 'express';
import { addReview, getReviews, toggleBlockReview } from '../controllers/reviewController.js';

const reviewRouter = express.Router();


reviewRouter.get("/", getReviews);


reviewRouter.post("/", addReview);


reviewRouter.put("/:id/block", toggleBlockReview);

export default reviewRouter;