const mysql = require("mysql"); //import mysql
const Promise = require("bluebird"); // import bluebird for async methods
Promise.promisifyAll(require("mysql/lib/Connection").prototype); // to make methods async

//db configuration
const dbinfo = {
  host: "localhost",
  user: "hitesh",
  password: "welcome",
  database: "wpt",
};

//create db connection

const addUser = async (user) => {
  const connection = mysql.createConnection(dbinfo); //creates db connection object

  await connection.connectAsync(); //make connection

  let sql = `insert into logindetails (username, password) values(?, ?)`; // query

  await connection.queryAsync(sql, [user.username, user.password]); // inser quer

  await connection.endAsync();
};

const login = async (user) => {
  const connection = mysql.createConnection(dbinfo); //creates db connection object

  await connection.connectAsync(); //make connection

  let sql = `select * from logindetails where username = ? and password = ?`; // query

  const list = await connection.queryAsync(sql, [user.username, user.password]); // inser quer

  await connection.endAsync();

  return list;
};

const selectUser = async () => {
  const connection = mysql.createConnection(dbinfo); //creates db connection object

  await connection.connectAsync(); //make connection

  let sql = `select * from logindetails`; // query

  const list = await connection.queryAsync(sql); // select query

  //   console.log(list);

  await connection.endAsync();

  return list;
};

// pass this object to function to insert into table
const user = {
  username: "notHitesh",
  password: "Thanks",
};

// addUser(user);
// selectUser();

module.exports = { addUser, selectUser, login };
