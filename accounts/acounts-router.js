const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json(await db("*").from("accounts"));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const account = await db("accounts")
      .where("id", req.params.id)
      .select()
      .first();
    res.json(account);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
