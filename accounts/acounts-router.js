const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

//get all accounts
router.get("/", async (req, res) => {
  try {
    res.json(await db("accounts").select());
  } catch (err) {
    next(err);
  }
});

//get account by id
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

//insert new account
router.post("/", async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };
    const [id] = await db("accounts").insert(payload);
    res.json(
      await db("accounts")
        .where("id", id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

//update an account
router.put("/:id", async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };
    await db("accounts")
      .where("id", req.params.id)
      .update(payload);
    res.json(
      await db("accounts")
        .where("id", req.params.id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

//delete an account
router.delete("/:id", async (req, res) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .del();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
