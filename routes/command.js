const express = require("express");
const router = express.Router();

const controller = require("../controllers/commandController");

router.get("/cmd", controller.form);
router.post("/cmd", controller.vulnerable);

router.get("/cmd-safe", controller.formSafe);
router.post("/cmd-safe", controller.safe);

router.get("/sql", controller.formSql);
router.post("/sql", controller.vulnerableSql);

router.get("/sql-safe", controller.formSqlSafe);
router.post("/sql-safe", controller.safeSql);

module.exports = router;