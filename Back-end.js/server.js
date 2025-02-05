import cors from "cors";
import express from "express";
import mysql2 from "mysql2/promise";
import bcrypt from "bcryptjs";
import {config} from "dotenv";


config();

const app = express();
app.use(cors()); // Allows frontend to communicate with backend
app.use(express.json());

// Database Connection
const pool = mysql2.createPool({
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "Macaws01",
  database: process.env.DATABASE || "modern_tech_solutions",
});

// Login API
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Empty" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.json({ message: "Login successful", role: user.role });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

const password = process.env.LOGIN; // Replace this with the user's password
const hashedPassword = await hashPassword(password);
console.log(hashedPassword);
