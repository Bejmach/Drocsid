import { v4 as uuidv4 } from 'uuid';

import db from '../models/db.js'

async function getMessagesFromChat(chatId, limit, offset) {
    const [rows] = await db.query('SELECT m.id, m.content, u.name, m.time FROM messages m '+
        'INNER JOIN users u ON u.id = m.userid '+
        'INNER JOIN textchats tc ON tc.id = m.textchatid '+
        `WHERE tc.id = ${chatId} `+
        'ORDER BY m.time '+
        `LIMIT ${limit} `+
        `OFFSET ${offset}`);
    return rows;
}

async function getMessagesFromChatAfter(chatId, messageId) {
    const [messages] = await db.query('Select m.id, m.content, u.name, m.time FROM messages m '+
        'INNER JOIN users u ON u.id = m.userid '+
        'INNER JOIN textchats tc ON tc.id = m.textchatid '+
        `WHERE tc.id = "${chatId}" `+
        'AND m.time > (SELECT m.time FROM messages m '+
        `WHERE m.id = "${messageId}") `+
        'ORDER BY m.time '
    );
    return messages
}

async function sendMessage(chatId, userId, content) {
    var id = uuidv4();
    var query = `SELECT id FROM messages WHERE id = "${id}"`;
    var check = await db.query(query);
    while (!check || check[0].length > 0) {
      id = uuidv4();
      var check = await db.query(`SELECT id FROM messages WHERE id = "${id}"`);
    }
    var check2 = await db.query(`SELECT id FROM users WHERE id = "${userId}"`);
    if (check2[0].length == 0) {
        return { success: false, message: "User doesn't exist" };
    }
    query = `SELECT id FROM textchats WHERE id = "${chatId}"`;
    var check3 = await db.query(query);
    
    if (check3[0].length == 0) {
        return { success: false, message: "Chat doesn't exist" };
    }

    var query = `INSERT INTO messages(id, content, userid, textchatid) VALUES("${id}", "${content}", "${userId}", "${chatId}")`;
    await db.query(query);
    query = `SELECT * FROM messages WHERE id = "${id}"`;
    var message = (await db.query(query))[0];
    console.log(message);

    return { success: true, message };
}

async function getAllMessages(){

    const [rows] = await db.query('SELECT * FROM messages ORDER BY time');
    console.log(rows);

    return rows;
}

export default {getMessagesFromChat, getMessagesFromChatAfter, sendMessage, getAllMessages};