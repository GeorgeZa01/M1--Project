import {getReview , get1Review , insertReview , deleteReview , updateReview } from '../model/performanceDB.js'

const getReviewCon = async (req, res) => {
    try {
        const employee_performance = await getReview(); // Fetch all reviews
        res.json({ employee_performance });
    } catch (error) {
        console.error("Error fetching employee reviews:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const get1ReviewCon = async (req, res) => {
    try {
        const performanceId = req.params.performance_id;
        if (!performanceId) {
            return res.status(400).json({ message: "Performance ID is required" });
        }

        const employee_performance = await get1Review(performanceId);
        if (!employee_performance) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json({ employee_performance });
    } catch (error) {
        console.error("Error fetching review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const insertReviewCon = async (req, res) => {
    try {
        const { performance_id, review, employee_id } = req.body;

        if (!performance_id || !review || !employee_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const employee_performance = await insertReview(performance_id, review, employee_id);
        res.status(201).json({ message: "Review inserted successfully", employee_performance });
    } catch (error) {
        console.error("Error inserting review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteReviewCon = async (req, res) => {
    try {
        const performanceId = req.params.performance_id;
        if (!performanceId) {
            return res.status(400).json({ message: "Performance ID is required" });
        }

        const result = await deleteReview(performanceId);
        if (!result) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateReviewCon = async (req, res) => {
    try {
        const { review } = req.body;
        const performanceId = req.params.performance_id;

        if (!performanceId) {
            return res.status(400).json({ message: "Performance ID is required" });
        }

        if (!review) {
            return res.status(400).json({ message: "Review content is required" });
        }

        const employee_performance = await updateReview(review, performanceId);
        if (!employee_performance) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json({ message: "Review updated successfully", employee_performance });
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export { getReviewCon, get1ReviewCon, insertReviewCon, deleteReviewCon, updateReviewCon };

