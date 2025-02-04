import express from "express";
import { config } from "dotenv";
import mysql2 from "mysql2/promise";

config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

app.listen(PORT, () => {
    console.log(`localhost://${PORT}`);
});