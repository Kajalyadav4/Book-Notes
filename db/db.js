const mysql = require('mysql');
const fs = require('fs');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abc2123A@',
  database: 'bookNotes'
});


fs.readFile('bookNotes.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log('Error reading file:', err);
    return;
  }

  const data = JSON.parse(jsonString);

  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }

    console.log('Connected to MySQL database');

    
    data.forEach((entry) => {
      const query = `INSERT INTO books (title, date_read, recommendation, genre, isbn, summary) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [
        entry.title,
        entry.date_read,
        entry.recommendation,
        entry.genre,
        entry.isbn,
        entry.summary
      ];

      connection.query(query, values, (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
          return;
        }
        console.log('Inserted a new row with ID:', results.insertId);
      });
    });

    
    connection.end((err) => {
      if (err) {
        console.error('Error closing connection:', err);
        return;
      }
      console.log('Closed the MySQL connection');
    });
  });
});
