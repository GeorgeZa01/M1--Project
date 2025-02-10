import express from "express"; 
import mysql from "mysql2/promise";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
})); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static assets
app.use(express.static('public'));

// Import routes
import employeesRouter from "../Back-end.js/routes/employeesRouter.js";
import timeoffRouter from "../Back-end.js/routes/timeoffRouter.js";

// Use routes
app.use('/api/employees', employeesRouter);
app.use('/api/timeoff', timeoffRouter);

// Basic route to serve HTML pages
app.get('/employees', (req, res) => {
  res.sendFile(process.cwd() + '/views/employees.html');
});
app.get('/timeoff', (req, res) => {
  res.sendFile(process.cwd() + '/views/Timeoff.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
