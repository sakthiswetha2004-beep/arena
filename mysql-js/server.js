const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


/* 🔹 LOGIN API */
app.post("/login", (req, res) => {
  const { email} = req.body;

  const sql = "SELECT password FROM users WHERE email = ? ";
  db.query(sql, [email], (err, result) => {
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