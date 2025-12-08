const mysql = require('mysql2/promise');

exports.handler = async () => {
  const connection = await mysql.createConnection({
    host: 'txshare.ctuo0o00sm3p.us-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Demo2026!',
    database: 'TXSHARE'
  });
  
  const [rows] = await connection.execute('SELECT id, questions, created_at FROM TXSHARE ORDER BY created_at DESC');
  await connection.end();
  
  return {
    statusCode: 200,
    body: JSON.stringify(rows.map(r => ({
      id: r.id,
      question: r.questions,
      created_at: r.created_at
    })))
  };
};
