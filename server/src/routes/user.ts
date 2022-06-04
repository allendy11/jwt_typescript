import express from "express";
import user from "../controllers/user";
const router = express.Router();

router.get("/validate", user.validateToken);
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/get/users", user.getAllUsers);

export default router;
