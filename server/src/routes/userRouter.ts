import express, { Request, Response, NextFunction } from "express";
import controllers from "../controllers/user";

const router = express.Router();

router.get("/validate", controllers.validateToken);
router.get("/register", controllers.register);
router.get("/login", controllers.login);
router.get("/get/all", controllers.getAllUsers);

export default router;
