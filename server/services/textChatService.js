import { v4 as uuidv4 } from 'uuid';

import db from '../models/db.js'

async function createChat(name) {
    var id = uuidv4();
    var check = await db.query(`SELECT id FROM textchats WHERE id = "${id}"`);
    while (!check || check[0].length > 0) {
      id = uuidv4();
      var check = await db.query(`SELECT id FROM textchats WHERE id = "${id}"`);
    }

    var query = `INSERT INTO textchats(id, name) VALUES("${id}", "${name}")`;
    await db.query(query);
    query = `SELECT * FROM textchats WHERE id = "${id}"`;
    var message = (await db.query(query))[0];
    console.log(message);

    return { success: true, message };
}

async function getAllTextChats(){

  const [rows] = await db.query('SELECT * FROM textchats');
  console.log(rows);

  return rows;
}

export default {createChat, getAllTextChats};