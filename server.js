const express = require("express");
const accountsRouter = require("./accounts/acounts-router.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", accountsRouter);

server.get("/", (req, res) => {
  res.send("<h3>Helpers with knex</h3>");
});

server.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    message: "Something went wrong. Try again later"
  });
});

module.exports = server;
