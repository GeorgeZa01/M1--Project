import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import { config } from "dotenv";

config();
const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "Macaws01",
  database: process.env.DATABASE || "modern_tech_solutions",
});

// Get employee names and IDs
app.get("/api/employees", async (req, res) => {
  try {
    const [employees] = await pool.query("SELECT employee_id, name FROM Employees");
    res.json({ employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get attendance data
app.get("/api/attendance", async (req, res) => {
  try {
    const [attendanceData] = await pool.query(`
      SELECT e.name, a.attendance_date, a.status, e.employee_id
      FROM Attendance a
      JOIN Employees e ON a.employee_id = e.employee_id
      ORDER BY e.employee_id, a.attendance_date ASC
    `);

    const transformedData = [];

    for (const entry of attendanceData) {
      const existingEmployee = transformedData.find(
        (emp) => emp.employeeId === entry.employee_id
      );

      if (!existingEmployee) {
        transformedData.push({
          employeeId: entry.employee_id,
          name: entry.name,
          attendance: [
            {
              date: entry.attendance_date,
              status: entry.status,
            },
          ],
        });
      } else {
        existingEmployee.attendance.push({
          date: entry.attendance_date,
          status: entry.status,
        });
      }
    }

    res.json({ attendanceAndLeave: transformedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add attendance entry
app.post("/api/attendance", async (req, res) => {
  const { employeeId, attendanceDate, status } = req.body;

  if (!employeeId || !attendanceDate || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO Attendance (employee_id, attendance_date, status) VALUES (?, ?, ?)`,
      [employeeId, attendanceDate, status]
    );

    res.status(201).json({ message: "Attendance record added successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
