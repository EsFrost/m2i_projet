const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/UserController");

/* method: GET */
userRouter.get("/users", userController.showUsers);
userRouter.get("/user/:id", userController.showUser);
userRouter.get("/username/:id", userController.showUsername);
userRouter.get("/email/:email", userController.showUserByEmail);

/* method: POST */
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);

/* method: DELETE */
userRouter.delete("/delete/:email", userController.delUser);

/* method: PUT */
userRouter.put("/changepass", userController.changePass);
userRouter.put("/changeuser/:id", userController.changeUser);

module.exports = userRouter;
