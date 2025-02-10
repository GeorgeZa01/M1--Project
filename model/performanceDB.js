import {pool} from '../config/config.js'
 //functions for performance

const getReview= async () => {
    let [data] = await pool.query('SELECT * FROM `employee_performance` ')
    return data
}
console.log(await getReview());// path to get all perfomance reviews 

const get1Review = async (performance_id) => {
    let [data]= await pool.query('SELECT * FROM WHERE perfomance_id=?', [performance_id])
    return data
}// path to one Review using PK(performance_id)

const insertReview = async (perfomance_id , review , employee_id ) => {
    let [data] = await pool.query('INSERT INTO `modern_tech_solutions`.`employee_performance`(`perfomance_id` , `review` , `employee_id`) VALUES (?,?,?)', [perfomance_id , review , employee_id])
    
    return await getReview() // allows us to see upated Review
}

const deleteReview = async (perfomance_id) => {
    let [data] = await pool.query('DELETE FROM employee_performance WHERE perfomance_id=?', [perfomance_id])

    return await getReview() // allows us to see updated Review after deleting
}

const updateReview = async (review , perfomance_id) => {
    let [data]= await pool.query('UPDATE `employee_performance` SET `review`=? WHERE `perfomance_id`=?' , [review , perfomance_id])

    return await getReview()
}

export {getReview , get1Review , insertReview , deleteReview , updateReview}