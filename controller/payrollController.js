import {getPayslip , get1Payslip , insertPayslip , deletePayslip , updatePayslip } from '../model/payrollDB.js'

const getPayslipCon = async (req, res) => {
    try {
        const payroll = await getPayslip(); // Fetch all payslips from DB

        if (!payroll || payroll.length === 0) {
            return res.status(404).json({ message: "No payslips found" });
        }

        res.json({ payroll });
    } catch (error) {
        console.error("Error fetching payslips:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const get1PayslipCon = async (req, res) => {
    try {
        const employeeId = req.params.employee_id;

        if (!employeeId) {
            return res.status(400).json({ message: "Employee ID is required" });
        }

        const payroll = await get1Payslip(employeeId);

        if (!payroll) {
            return res.status(404).json({ message: `Payslip not found for Employee ID: ${employeeId}` });
        }

        res.json({ payroll });
    } catch (error) {
        console.error("Error fetching payslip:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const insertPayslipCon = async (req, res) => {
    try {
        const { employee_id, hours_worked, leave_deductions, final_salary } = req.body;

        if (!employee_id || !hours_worked || !leave_deductions || !final_salary) {
            return res.status(400).json({ message: "All fields (employee_id, hours_worked, leave_deductions, final_salary) are required" });
        }

        const payroll = await insertPayslip(employee_id, hours_worked, leave_deductions, final_salary);
        res.status(201).json({ message: "Payslip added successfully", payroll });
    } catch (error) {
        console.error("Error inserting payslip:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deletePayslipCon = async (req, res) => {
    try {
        const employeeId = req.params.employee_id;

        if (!employeeId) {
            return res.status(400).json({ message: "Employee ID is required" });
        }

        const result = await deletePayslip(employeeId);

        if (!result) {
            return res.status(404).json({ message: `No payslip found to delete for Employee ID: ${employeeId}` });
        }

        res.json({ message: "Payslip deleted successfully" });
    } catch (error) {
        console.error("Error deleting payslip:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updatePayslipCon = async (req, res) => {
    try {
        const { hours_worked } = req.body;
        const employeeId = req.params.employee_id;

        if (!employeeId) {
            return res.status(400).json({ message: "Employee ID is required" });
        }

        if (!hours_worked) {
            return res.status(400).json({ message: "hours_worked is required to update" });
        }

        const payroll = await updatePayslip(hours_worked, employeeId);

        if (!payroll) {
            return res.status(404).json({ message: `No payslip found to update for Employee ID: ${employeeId}` });
        }

        res.json({ message: "Payslip updated successfully", payroll });
    } catch (error) {
        console.error("Error updating payslip:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export { getPayslipCon, get1PayslipCon, insertPayslipCon, deletePayslipCon, updatePayslipCon };



