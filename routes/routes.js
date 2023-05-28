import express from "express";
import UsersController from "../controllers/UsersController.js";
import SessionsController from "../controllers/SessionsController.js";
import CommentsController from "../controllers/CommentsController.js";
import MessagesController from "../controllers/MessagesController.js";

const router = express.Router();

router.get("/", UsersController.loginRegister);
router.get("/wall", UsersController.index);

// register
router.post("/users", UsersController.create);

// login
router.post("/sessions", SessionsController.create);

// post
router.post("/messages", MessagesController.create);
router.post("/messages/destroy", MessagesController.destroy);

// comment
router.post("/comments", CommentsController.create);
router.post("/comments/destroy", CommentsController.destroy);
export default router;