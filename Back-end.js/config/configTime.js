import mysql from "mysql2/promise";
import {config} from 'dotenv'
config()

const pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'Yandsmatyi@7126',
    database:'modern_tech_solutions'
})

export {pool}