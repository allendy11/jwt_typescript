import express from "express";
import user from "../controllers/user";
import extractJWT from "../middleware/extractJWT";

const router = express.Router();

router.get("/validate", extractJWT, user.validateToken);
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/get/users", user.getAllUsers);

export default router;
