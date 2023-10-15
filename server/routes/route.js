const express = require("express");

const {
  add,
  getAll,
  update,
  deleteCRUD,
} = require("../controller/crud-controller.js");

const route = express.Router();

route.post("/add", add);
route.get("/getAll", getAll);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteCRUD);

module.exports = route;
