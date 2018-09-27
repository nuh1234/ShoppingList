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
        let escapedName = escapeString(name);
        let escapedEmail = escapeString(email);
        let escapedPass = escapeString(password);

        let users = await module.exports.getUsers(escapedEmail);
        // We only create if the user doesn't exist
        if (users == false) {
            return new Promise((resolve) => {
                let query = `INSERT INTO users (name, email, password) VALUES ('${escapedName}', '${escapedEmail}', '${escapedPass}')`;
                dataBase.query(query, (err, result) => {
                    if (err) {
                        console.log(err.message);
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });     
            });
        }
        return false;
    },
    login: async (email, password) => {
        if (!!email && !!password) {
            let escapedEmail = escapeString(email);
            let result = await module.exports.getUsers(escapedEmail);        
            return new Promise((resolve) => {
                if (result) {
                    let foundPassword = result[0].password;
                    let foundUserEmail = result[0].email;
                    if (email === foundUserEmail && password === foundPassword) {
                        // store user in session
                        console.log('match');
                        resolve(result[0]);
                    } else {
                        console.log('no match');
                        resolve(false);
                    }
                }
            });
        }
        return false;
    },
    addItemForUser: (userid, item) => {
        return new Promise((resolve, reject) => {
            let escapedItem = escapeString(item);
            let query = `INSERT INTO userItems (item, isDone, ownerid) VALUES ('${escapedItem}', '0', '${userid}')`;
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
                    resolve(result);
                }
            });     
        });
    },
    markTaskDone: (taskid) => {
        return new Promise((resolve, reject) => {
            let query = `UPDATE userItems SET isDone = 1 WHERE itemid = ${taskid}`;
            dataBase.query(query, (err, result) => {
                if (err) {
                    console.log(err.message);
                    reject(false);
                } else {
                    console.log('Updated Task');
                    resolve(true);
                }
            });     
        });
    },

    getUsers: (email) => {
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
}

//Regex found online for safely escaping sql strings, this helps avoid things like sql injection attacks
function escapeString (s) {
    return s.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char;
        }
    });
}