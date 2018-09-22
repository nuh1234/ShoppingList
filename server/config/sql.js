const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'secret',
  database: 'my_db'
});