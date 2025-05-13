import db from '../models/db.js'

async function joinChat(chatId, userId) {

    var query = `SELECT id FROM users WHERE id = "${userId}"`;
    const check = await db.query(query);
    if (check[0].length == 0) {
      return { success: false, message: 'User doesn\'t exists' };
    }
    query = `SELECT id FROM textchats WHERE id = "${chatId}"`;
    const check2 = await db.query(query);
    if (check2[0].length == 0) {
      return { success: false, message: 'Chat doesn\'t exists' };
    }

    var query = `INSERT INTO usertextchat(userid, textchatid) VALUES("${userId}", "${chatId}")`;
    await db.query(query);
    query = `SELECT * FROM usertextchat WHERE userid = "${userId}" AND textchatid = "${chatId}"`;
    var message = (await db.query(query))[0];
    console.log(message);

    return { success: true, message };
}

async function getAllUserTextChat(){

  const [rows] = await db.query('SELECT * FROM usertextchat');
  console.log(rows);

  return rows;
}

export default {joinChat, getAllUserTextChat};