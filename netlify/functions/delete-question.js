const mysql = require('mysql2/promise');

exports.handler = async (event) => {
  // Only accept DELETE requests
  if (event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { id } = JSON.parse(event.body);
    
    if (!id) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Question ID is required' }) };
    }

    const connection = await mysql.createConnection({
      host: 'txshare.ctuo0o00sm3p.us-west-2.rds.amazonaws.com',
      user: 'admin',
      password: 'Demo2026!',
      database: 'TXSHARE',
      port: 3306
    });
    
    await connection.execute('DELETE FROM TXSHARE WHERE id = ?', [id]);
    await connection.end();
    
    return { 
      statusCode: 200, 
      body: JSON.stringify({ success: true, message: 'Question deleted' })
    };
  } catch (error) {
    console.error('Error:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Failed to delete question' }) 
    };
  }
};
