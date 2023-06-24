import express from "express";
import isUserAuthorized from "../middlewares/isUserAuthorized.js";
import isUserLoggedIn from "../middlewares/isUserLoggedIn.js";
import UsersController from "../controllers/UsersController.js";
import SessionsController from "../controllers/SessionsController.js";
import CommentsController from "../controllers/CommentsController.js";
import MessagesController from "../controllers/MessagesController.js";

const router = express.Router();

router.get("/", isUserLoggedIn, UsersController.loginRegister);
router.get("/wall", isUserAuthorized, UsersController.index);

// register
router.post("/users", isUserLoggedIn, UsersController.create);

// login
router.post("/sessions", isUserLoggedIn, SessionsController.create);

// post
router.post("/messages", isUserAuthorized, MessagesController.create);
router.post("/messages/destroy", isUserAuthorized, MessagesController.destroy);

// comment
router.post("/comments", isUserAuthorized, CommentsController.create);
router.post("/comments/destroy", isUserAuthorized, CommentsController.destroy);
export default router;