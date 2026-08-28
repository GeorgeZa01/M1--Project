import {pool} from '../config/configTime.js'; // Make sure to import your db connection here

// Function to create a time off request
const createRequest = async (data) => {
    const { todaysDate, employeeName, startDate, endDate, reasons, otherReason } = data;
    const query = `
        INSERT INTO time_off_requests (todays_date, employee_name, start_date, end_date, reasons, other_reason)
        VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [todaysDate, employeeName, startDate, endDate, reasons.join(", "), otherReason || null];

    try {
        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Function to get all time off requests
const getRequests = async () => {
    const query = "SELECT * FROM time_off_requests";
    try {
        const [rows] = await db.execute(query);
        return rows;
    } catch (error) {
        throw error;
    }
};

// Exporting the functions directly
export { createRequest, getRequests };
