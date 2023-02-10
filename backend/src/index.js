const express = require("express");
const app = express();
const calculateController = require("./controllers/calculate.controller");

app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("", calculateController);
const PORT = 8080;
app.listen(PORT, async () => {
  try {
    console.log(`Listening to port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
