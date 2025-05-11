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

export default {getMessagesFromChat};