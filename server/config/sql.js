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
    createUser: (name, email, password, callBack) => {
        if (email && name && password) {
            getUserForEmail(email, (user) => {            
                if (typeof user === 'string') {
                    let query = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
                    dataBase.query(query, (err, result) => {
                        if (err) {
                            console.log(err.message);
                            callBack(false);
                        } else {
                            console.log('Created succesfully');
                            callBack(true);
                        }
                    });
                } else {
                    callBack(false);
                }
            });
        } else {
            callBack(false);
        }
    },
    login: (email, password, callBack) => {
        if (email && password) {
            getUserForEmail(email, (result) => {
                if (result) {
                    let foundPassword = result[0].password;
                    let foundUserEmail = result[0].email;
                    console.log(foundUserEmail);
                    console.log(foundPassword);
                    if (email === foundUserEmail && password === foundPassword) {
                        console.log('match');
                        // store user in session
                        callBack(true);
                    } else {
                        callBack(false);
                    }
                } 
            });
        } else {
            callBack(false);
        }
    },
    login2: async (email, password) => {
        let result = await getUser(email);        
        if (result) {
            let foundPassword = result[0].password;
            let foundUserEmail = result[0].email;
            console.log(foundUserEmail);
            console.log(foundPassword);
            if (email === foundUserEmail && password === foundPassword) {
                console.log('match');
                // store user in session
                return true;
            } else {
                return false;
            }
        }
    }
}

function getUserForEmail(email, callBack) {
    let query = `SELECT * FROM users WHERE email = '${email}'`;
    dataBase.query(query, (err, result) => {
        if (err) {
            console.log(err.message);
            // User doesn't exist
            callBack(false);
        } else {
            console.log(result[0].email + " exists!");
            // return user
            callBack(result);
        }
    });
}

function getUser(email) {
    return new Promise ((resolve, reject) => {
        let query = `SELECT * FROM users WHERE email = '${email}'`;
        dataBase.query(query, (err, result) => {
            if (err) {
                console.log(err.message);
                // User doesn't exist
                reject(false);
            } else {
                console.log(result[0].email + " exists!");
                // return user
                resolve(result);
            }
        });
    });

}