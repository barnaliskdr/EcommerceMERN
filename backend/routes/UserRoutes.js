import {register,login } from "../controller/authentication.js";
import express from 'express';
import authorizeRoles from "../middlewares/authorizeRoles.js";
import verifyToken from "../middlewares/authMiddleware.js";
const router = express.Router();

// router.post("/login",login);
// router.post("/register",register);

router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.send("Welcome Admin");
});

router.get("/customer", authorizeRoles("admin", "manager", "customer"), (req, res) => {
    res.send("Welcome Customer");
});

router.post("/manager", authorizeRoles("admin", "manager"), (req, res) => {
    res.send("Welcome Manager");
});


export default router;

