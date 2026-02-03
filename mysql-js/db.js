const mysql = require("mysql2");
// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Meshak19",
  database: "Zophrix"
});

// Connect DB
db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});
module.exports=db;