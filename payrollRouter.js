import express from "express"
import {deletePayslipCon, get1PayslipCon, getPayslipCon, insertPayslipCon, updatePayslipCon } from '../controller/payrollController.js'

//manages paths from different file as I can't use app.get/app.post...can't use const app= express
const router = express.Router()

// router that returns all payslips in the db
router.get('/',getPayslipCon)

// that returns a single product based on its PK
router.get('/:employee_id' ,get1PayslipCon)

//that insert a new payslip within the database
router.post('/', insertPayslipCon)

// that deletes a payslip based on its PK
router.delete('/:employee_id', deletePayslipCon)

// that updates a payslip based on its PK
router.patch('/:employee_id', updatePayslipCon)

export default router