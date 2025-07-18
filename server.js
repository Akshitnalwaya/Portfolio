const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname))); // serve your HTML/CSS/JS

app.post("/submit", (req, res) => {
  const formData = req.body;

  let data = [];
  const filePath = path.join(__dirname, "data.json");

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath));
  }

  data.push({ ...formData, timestamp: new Date().toISOString() });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(200).json({ message: "Data saved successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
