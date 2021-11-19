const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const errorHandler = require("./middleware/errorHandlerMiddleware");
require("dotenv").config();
const listingRoutes = require("./routes/listingRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/listings", listingRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello frojbm let it go backend");
});
const PORT = process.env.PORT || 4500;

app.use(errorHandler);

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
