import express from "express";
import timeOffController from "../controller/timeoffCOntroller.js"; // Ensure the filename is correctly spelled

const router = express.Router(); // Correct router initialization

// Define routes
router.post("/submit", timeOffController.submitRequestCon);
router.get("/requests", timeOffController.getAllRequestsCon);

export default router; // Correct export
