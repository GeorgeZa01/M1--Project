import {pool} from '../config/config.js'

//functions for payslips

const getPayslip = async () => {
    let [data] = await pool.query('SELECT * FROM `payroll` ')
    return data
}
console.log(await getPayslip());// path to get all payslips 

const get1Payslip = async (employee_id) => {
    let [data]= await pool.query('SELECT * FROM payroll WHERE employee_id=?', [employee_id])
    return data
}// path to one payslip using PK(employee_id)

const insertPayslip = async (employee_id , hours_worked , leave_deductions , final_salary) => {
    let [data] = await pool.query('INSERT INTO `modern_tech_solutions`.`payroll`(`employee_id` , `hours_worked` , `leave_deductions` , `final_salary`) VALUES (?,?,?,?)', [employee_id , hours_worked , leave_deductions , final_salary])
    
    return await getPayslip() // allows us to see upated payslips
}

const deletePayslip = async (employee_id) => {
    let [data] = await pool.query('DELETE FROM payroll WHERE employee_id=?', [employee_id])

    return await getPayslip() // allows us to see updated payslips after deleting
}

const updatePayslip = async (hours_worked , employee_id) => {
    let [data]= await pool.query('UPDATE `payroll` SET `hours_worked`=? WHERE `employee_id`=?' , [hours_worked , employee_id])

    return await getPayslip()
}

export {getPayslip , get1Payslip , insertPayslip , deletePayslip , updatePayslip}

