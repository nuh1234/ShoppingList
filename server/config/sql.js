const mysql = require('mysql');

const dataBase = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'todo'
});

// connect to database
dataBase.connect((err) => {
    if (err) {
        console.log(`cant connect ${ err.message }`);
    } else {
        console.log('Connected to database');
    }
});

module.exports = {
    createUser: (email, name, password) => {
        if (email && name && password) {
            let query = `INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password})`;
            dataBase.query(query, (err, result) => {
                if (err) {
                    console.log(error.message);
                    return false;
                }
                console.log(`Created ${result.message}`);
                return true;
            });
        }
    },
    login: (email, password) => {
        if (email && password) {
        }
    }
}