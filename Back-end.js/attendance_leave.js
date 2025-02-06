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

app.get("/api/attendance", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM attendance");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/leave", async (req, res) => {
    try{
        
    }

