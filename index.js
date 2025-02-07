import cors from "cors";
import express from "express";
import bcrypt from "bcryptjs";
import {config} from "dotenv";
import login_route from "./routes/login_Route.js";

config();
const app = express();
app.use(cors()); // Allows frontend to communicate with backend
app.use(express.json());

//middleware
app.use('/api/login', login_route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Hash the user's password
async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

const password = process.env.LOGIN; // Replace this with the user's password
const hashedPassword = await hashPassword(password);
console.log(hashedPassword);

// Export the hashed password
export { hashedPassword };
