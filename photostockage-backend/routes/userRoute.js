const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/UserController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

/* method: GET */
userRouter.get("/users", userController.showUsers);
userRouter.get("/user/:id", userController.showUser);
userRouter.get("/username/:id", userController.showUsername);
userRouter.get("/email/:email", userController.showUserByEmail);

/* method: POST */
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/logout", authMiddleware, userController.logoutUser);

/* method: DELETE */
userRouter.delete(
  "/delete/:email",
  authMiddleware,
  isAdmin,
  userController.delUser
);

/* method: PUT */
userRouter.put("/changepass", authMiddleware, userController.changePass);
userRouter.put("/changeuser/:id", authMiddleware, userController.changeUser);

module.exports = userRouter;
