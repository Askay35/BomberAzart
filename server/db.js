const config = require("./config");

let mysql = require("mysql");

let db = mysql.createConnection(config.database);

db.connect(function (err) {
  if (err) throw err;
  console.log("Database connected");
});

function asyncQuery(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

module.exports = { db, asyncQuery };
