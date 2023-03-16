const express = require("express");
const userController = require('../controller/controller');
const auth = require('../../auth/authorization')

const router = express.Router();

router.post("/create-user", userController.createUser);

router.get("/get-user",auth.authorize, userController.getUser);
router.put("/update-user", auth.authorize, userController.updateUser);
router.delete("/delete-user",auth.authorize, userController.deleteUser);
router.post("/refresh-token", auth.resetAccessToken);


module.exports = router