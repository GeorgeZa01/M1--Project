import cors from "cors"
import express from "express"
//importing the routers
import payrollRouter from './routes/payrollRouter.js'
import performanceRouter from './routes/performanceRouter.js'
// import bcrypt from "bcryptjs"
import { config } from "dotenv"
config()

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors({
  origin :' http://localhost:3000'
})) // Allows frontend to communicate with backend

app.use(express.json())
//using the routes
app.use('/payslip', payrollRouter)
app.use('/performance', performanceRouter)

app.listen(PORT,()=>{
  console.log(('http://localhost:'+ PORT));
  
})

// // Test Route
// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });

// // Hash Password Function
// async function hashPassword(password) {
//   const saltRounds = 10; // Number of salt rounds
//   const hashedPassword = await bcrypt.hash(password, saltRounds);
//   return hashedPassword;
// }

// // Test async function execution
// async function run() {
//   const password = process.env.LOGIN; // Replace this with the user's password
//   if (!password) {
//     console.error('Password is missing');
//     return;
//   }
//   const hashedPassword = await hashPassword(password);
//   console.log(hashedPassword);
// }

// run(); // Call the async function to execute

// // Login API
// app.post("/api/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({ error: "Username and password required" });
//     }

//     // Replace with actual database connection when you're ready to enable it
//     // const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

//     // Mock data for testing
//     const rows = [{ username: "testUser", password: "$2a$10$gYzBqlTYgI4IsOht5lEr7uXaA2KdsZoejCBkFTyFHpAEgslcbObEm" }];

//     if (rows.length === 0) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     const user = rows[0];
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {  
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     res.json({ message: "Login successful", role: user.role });
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
  