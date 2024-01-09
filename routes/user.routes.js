const { UserController } = require("../controllers");
const authJwt = require("../middlewares/authJwt");


const express = require("express");
const router = express.Router();

router.get("/", authJwt,UserController.getAll);
router.get("/:id", authJwt,UserController.getById);
router.put("/create", UserController.create);
router.patch("/update",authJwt, UserController.update);
router.delete("/:id", authJwt,UserController.delete);
router.patch("/update-password",authJwt, UserController.updatePassword);
router.get("/fetchOuterApi/list", UserController.fetchOuterApi);
// ** Auth Routes
router.post("/loginByUsername", UserController.loginByUsername);
router.post("/loginByEmail", UserController.login);
router.post("/forgot-password",authJwt, UserController.forgotPassword);
router.post("/forgot-password-check", authJwt,UserController.forgotPasswordCheck);
router.post("/verifyToken", authJwt);



module.exports = router;
