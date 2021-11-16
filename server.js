const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from let it go backend");
});
const PORT = process.env.PORT || 4500;

mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
