import express from "express"
import { getReviewCon, get1ReviewCon, insertReviewCon, deleteReviewCon, updateReviewCon } from '../controller/performanceController.js'

//manages paths from different file as I can't use app.get/app.post...can't use const app= express
const router = express.Router()

// router that returns all Reviews in the db
router.get('/Review',getReviewCon)

// that returns a single product based on its PK
router.get('/:Review_id' ,get1ReviewCon)

//that insert a new Review within the database
router.post('/', insertReviewCon)

// that deletes a Review based on its PK
router.delete('/:Review_id', deleteReviewCon)

// that updates a Review based on its PK
router.patch('/:Review_id', updateReviewCon)

export default router