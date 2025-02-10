import {pool} from "../config/config.js"

class TimeOffRequest {
    static async createRequest(data) {
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
    }

    static async getRequests() {
    const query = "SELECT * FROM time_off_requests";
    try {
        const [rows] = await db.execute(query);
        return rows;
    } catch (error) {
        throw error;
    }
    }
}

export { TimeOffRequest };
