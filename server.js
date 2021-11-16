const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from let it go backend");
});
const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
