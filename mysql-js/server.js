const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* 🔹 CREATE TABLE */
const createTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
  )
`;

db.query(createTable, err => {
  if (err) {
    console.error("Table error:", err);
    return;
  }
  console.log("Users table ready");

  /* 🔹 INSERT DUMMY USERS */
  const insertUsers = `
    INSERT IGNORE INTO users (email, password) VALUES
    ('john@example.com', '123456'),
    ('swetha@gmail.com', 'swetha123'),
    ('sakthi@gmail.com', 'sakthi123')
  `;

  db.query(insertUsers, err => {
    if (err) console.error("Insert error:", err);
    else console.log("Dummy users inserted");
  });
});

/* 🔹 LOGIN API */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});