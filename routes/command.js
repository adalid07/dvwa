const express = require("express");
const router = express.Router();

const controller = require("../controllers/commandController");

// Rutas para Command Execution
router.get("/cmd", controller.form);
router.post("/cmd", controller.vulnerable);

router.get("/cmd-safe", controller.formSafe);
router.post("/cmd-safe", controller.safe);

// Rutas para SQL Injection
// /sql: Versión vulnerable - permite inyección SQL mediante concatenación directa
router.get("/sql", controller.formSql);
router.post("/sql", controller.vulnerableSql);

// /sql-safe: Versión segura - usa parámetros preparados y validación para prevenir inyección
router.get("/sql-safe", controller.formSqlSafe);
router.post("/sql-safe", controller.safeSql);

module.exports = router;