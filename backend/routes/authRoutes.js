import express from "express";
import { register, login } from "../controller/rolebasedauthcontroller.js"; // Adjust the path as necessary


const router = express.Router();
router.post("/register",register);
router.post("/login", login); // Uncomment if you have a login function


export default router ;