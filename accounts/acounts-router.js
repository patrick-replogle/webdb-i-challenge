const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

//async await get all accounts
router.get("/", async (req, res, next) => {
  try {
    res.json(
      await db("accounts")
        .limit(req.query.limit)
        .select()
    );
  } catch (err) {
    next(err);
  }
});

//async await get account by id
router.get("/:id", async (req, res, next) => {
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

//async await insert new account
router.post("/", async (req, res, next) => {
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

//async await update an account
router.put("/:id", async (req, res, next) => {
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

//async await delete an account
router.delete("/:id", async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .del();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

//non async await versions of routers

// router.get("/", (req, res, next) => {
//   db("accounts")
//     .select()
//     .then(actions => {
//       res.status(200).json(actions);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// router.get("/:id", (req, res, next) => {
//   db("accounts")
//     .where("id", req.params.id)
//     .select()
//     .first()
//     .then(action => {
//       res.status(200).json(action);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// router.post("/", (req, res, next) => {
//   const payload = {
//     name: req.body.name,
//     budget: req.body.budget
//   };
//   db("accounts")
//     .insert(payload)
//     .then(ids => {
//       const id = ids[0];
//       db("accounts")
//         .where({ id })
//         .first()
//         .then(account => res.status(200).json(account));
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// router.put("/:id", (req, res, next) => {
//   const { id } = req.params;
//   const payload = {
//     name: req.body.name,
//     budget: req.body.budget
//   };
//   db("accounts")
//     .where({ id })
//     .update(payload)
//     .then(() => {
//       db("accounts")
//         .where({ id })
//         .first()
//         .then(account => {
//           res.status(201).json(account);
//         });
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// router.delete("/:id", (req, res, next) => {
//   const { id } = req.params;
//   db("accounts")
//     .where({ id })
//     .del()
//     .then(account => {
//       if (account) {
//         res.status(204).end();
//       } else {
//         res.status(404).json({ message: "Invalid id" });
//       }
//     })
//     .catch(err => {
//       next(err);
//     });
// });

module.exports = router;
