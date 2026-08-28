import express from "express";
import {submitRequestCon,getAllRequestsCon} from "../controller/timeoffCOntroller.js"; // Ensure the filename is correctly spelled

const router = express.Router(); // Correct router initialization

// Define routes
router.post("/submit", submitRequestCon);
router.get("/requests", getAllRequestsCon);

export default router; // Correct export
