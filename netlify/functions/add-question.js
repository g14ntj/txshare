const mysql = require('mysql2/promise');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };
  
  const { question } = JSON.parse(event.body);
  
  const connection = await mysql.createConnection({
    host: 'txshare.ctuo0o00sm3p.us-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Demo2026!',
    database: 'TXSHARE'
  });
  
  await connection.execute('INSERT INTO TXSHARE (questions) VALUES (?)', [question]);
  await connection.end();
  
  return { statusCode: 201, body: JSON.stringify({ success: true }) };
};
