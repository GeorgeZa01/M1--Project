import {createRequest,getRequests} from "../model/timeoffModel.js"


const submitRequestCon = async (req, res) => {
    try {
    const { todaysDate, employeeName, startDate, endDate, reasons, otherReason } = req.body;

    if (!todaysDate || !employeeName || !startDate || !endDate || !reasons || reasons.length === 0) {
    return res.json({ message: "All fields are required and at least one reason must be selected." });
    }

    await TimeOffRequest.createRequest({ todaysDate, employeeName, startDate, endDate, reasons, otherReason });
    res.json({ message: "Time-off request submitted successfully." });
    } catch (error) {
    res.json({ message: "Server error", error });
    }
};

const getAllRequestsCon = async (req, res) => {
    try {
    const requests = await TimeOffRequest.getRequests();
    res.json(requests);
    } catch (error) {
    res.json({ message: "Server error", error });
    }  
};

export { submitRequestCon, getAllRequestsCon };