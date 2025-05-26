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
    var user = (await db.query(query))[0];
    console.log(user);

    return { success: true, user };
}

async function loginUser(email, password){
  const salt = process.env.SALT;
  const hash = hashPassword(password, salt);

  var query = `SELECT * FROM users WHERE email = "${email}" AND password = "${hash}"`;
  var user = (await db.query(query))[0];
  console.log(user);

  if (user[0].length == 0){
    return {success: false, user};
  }

  return { success: true, user };
}

async function getAllUsers(){

    const [rows] = await db.query('SELECT * FROM users');
    console.log(rows);

    return rows;
}

async function getUsersFromChat(chatid){
  var query = `SELECT u.id, u.name FROM users u INNER JOIN usertextchat utc ON u.id = utc.userid INNER JOIN textchats tc ON tc.id = utc.textchatid WHERE tc.id = "${chatid}"`;
  const users = (await db.query(query))[0];

  return { success: true, users };
}

export default {getAllUsers, registerUser, loginUser, getUsersFromChat};