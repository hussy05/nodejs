const { UserController } = require("../controllers");
const authJwt = require("../middlewares/authJwt");


const express = require("express");
const router = express.Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.put("/create", UserController.create);
router.patch("/update", UserController.update);
router.delete("/:id", UserController.delete);
router.patch("/update-password", UserController.updatePassword);
router.get("/fetchOuterApi/list", UserController.fetchOuterApi);
// ** Auth Routes
router.post("/loginByUsername", UserController.loginByUsername);
router.post("/loginByEmail", UserController.login);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/forgot-password-check", UserController.forgotPasswordCheck);
router.post("/verifyToken", authJwt);



module.exports = router;
