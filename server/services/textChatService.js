import { v4 as uuidv4 } from 'uuid';

import db from '../models/db.js'

async function createChat(name) {
    var id = uuidv4();
    var check = await db.query(`SELECT id FROM textchats WHERE id = "${id}"`);
    while (check || check[0].length > 0) {
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

async function getAllChatsWithUser(userid){
    var check = await db.query(`SELECT id FROM users WHERE id = "${userid}"`)
    if(!check || check[0].length == 0){
        return { success: false, check };
    }

    var query = `SELECT tc.id as id, tc.name as name, (
            SELECT count(utc.userid) 
            FROM usertextchat utc 
            WHERE utc.textchatid = tc.id 
            GROUP BY utc.textchatid) as user_count
        FROM textchats tc 
        INNER JOIN usertextchat utc ON utc.textchatid = tc.id 
        WHERE utc.userid = "${userid}" 
        AND tc.id IN (
            SELECT utc.textchatid FROM usertextchat utc 
            GROUP BY 1 
            HAVING count(utc.userid) != 2 
        )`

    const [rows] = await db.query(query);
    return { success: true, rows };
}
async function getAllDMWithUser(userid){
    var check = await db.query(`SELECT id FROM users WHERE id = "${userid}"`)
    if(!check || check[0].length == 0){
        return { success: false, check };
    }

    var query = `SELECT tc.id as id, tc.name as name, (
            SELECT count(utc.userid) 
            FROM usertextchat utc 
            WHERE utc.textchatid = tc.id 
            GROUP BY utc.textchatid) as user_count
        FROM textchats tc 
        INNER JOIN usertextchat utc ON utc.textchatid = tc.id 
        WHERE utc.userid = "${userid}" 
        AND tc.id IN (
            SELECT utc.textchatid FROM usertextchat utc 
            GROUP BY 1 
            HAVING count(utc.userid) = 2 
        )`

    const [rows] = await db.query(query);
    return { success: true, rows };
}

export default {createChat, getAllTextChats, getAllChatsWithUser, getAllDMWithUser};
