import db from '../models/db.js'
import dotenv from 'dotenv'

import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto'

dotenv.config({ path: './config/.env' });

function hashPassword(password, salt) {
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash ;
}


async function registerUser(name, email, password){
    
    var query = `SELECT id FROM users WHERE email = "${email}"`;
    const check = await db.query(query);
    if (check[0].length > 0) {
      return { success: false, message: 'User already exists' };
    }
    console.log(check[0].length);
    var id = uuidv4();
    var check2 = await db.query(`SELECT id FROM users WHERE id = "${id}"`);
    while (check2[0].length > 0) {
      id = uuidv4();
      var check2 = await db.query(`SELECT id FROM users WHERE id = "${id}"`);
    }

    const salt = process.env.SALT;
    const hash = hashPassword(password, salt);

    query = `INSERT INTO users (id, name, email, password) VALUES ("${id}", "${name}", "${email}", "${hash}")`;
    await db.query(query);
    query = `SELECT * FROM users WHERE id = "${id}"`;
    var user =  db.query(query);
    console.log(user);

    return { success: true, user };
}

async function getAllUsers(){

    const [rows] = await db.query('SELECT * FROM users');
    console.log(rows);

    return rows;
}

export default {getAllUsers, registerUser};