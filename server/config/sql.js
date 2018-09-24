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
global.dataBase = dataBase;

module.exports = {
    createUser: async (name, email, password) => {
        let users = await getUsers(email);
        // We only create if the user doesn't exist
        if (users == false) {
            return new Promise((resolve) => {
                let query = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
                dataBase.query(query, (err, result) => {
                    if (err) {
                        console.log(err.message);
                        resolve(false);
                    } else {
                        console.log('Created succesfully');
                        resolve(true);
                    }
                });     
            });
        }
        return false;
    },
    login: async (email, password) => {
        if (!!email && !!password) {
            let result = await getUsers(email);        
            return new Promise((resolve) => {
                if (result) {
                    let foundPassword = result[0].password;
                    let foundUserEmail = result[0].email;
                    console.log(foundUserEmail);
                    console.log(foundPassword);
                    if (email === foundUserEmail && password === foundPassword) {
                        // store user in session
                        console.log('match');
                        resolve(true);
                    } else {
                        console.log(' no match');
                        resolve(false);
                    }
                }
            });
        }
        return false;
    },
    addItemForUser: (userid, item) => {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO userItems (item, ownerid, isDone) VALUES ('${item}', '${userid}', '0')`;
            dataBase.query(query, (err, result) => {
                if (err) {
                    console.log(err.message);
                    reject(false);
                } else {
                    console.log('added succesfully');
                    resolve(true);
                }
            });     
        });
    },
    getlistForUser: (userid) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM userItems WHERE ownerid = '${userid}'`;
            dataBase.query(query, (err, result) => {
                if (err) {
                    console.log(err.message);
                    reject(false);
                } else {
                    console.log('Found List');
                    resolve(result);
                }
            });     
        });
    }
}

function getUsers(email) {
    return new Promise ((resolve, reject) => {
        let query = `SELECT * FROM users WHERE email = '${email}'`;
        dataBase.query(query, (err, result) => {
            if (err) {
                // Error
                reject(false);
            } else {
                if (result.length == 0) {
                    resolve(false);
                }
                resolve(result);
            }
        });
    });
}