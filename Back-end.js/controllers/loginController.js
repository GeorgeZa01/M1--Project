import { getUserByUsername } from "../models/loginModel";

const loginController = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" }); //No input
      }
  
      if (rows.length === 0) {
        return res.status(401).json({ error: "Empty" }); //No user
      }
  
      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(402).json({ error: "Invalid username or password" });//Wrong password or username
      }
  
      res.json({ await getUserByUsername(), role: user.role });//Login successful
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal Server Error" }); //Database error
    }
  }

  export { loginController };