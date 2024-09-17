import {register,login } from "../controller/authentication.js";
import express from 'express';
const router = express.Router();

router.get("/login",login);
router.post("/register",register);

export default router;