const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const paperRoutes = require("./routes/paper.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/pyqfinder")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/papers", paperRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
