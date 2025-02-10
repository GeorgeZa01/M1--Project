import express from "express";
import { fetchEmployees } from "../controllers/attendanceController.js";
import { fetchAttendance, createAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/names", fetchEmployees);
router.get("/", fetchEmployees);
router.get("/", fetchAttendance);
router.post("/", createAttendance);

export default router;
