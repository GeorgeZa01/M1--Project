import { pool } from "..config/config.js";

const getUserByUsername = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM login WHERE username = ?", [username]);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching user data");
  }
};
  
  export { getUserByUsername };         