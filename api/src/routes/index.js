import express from 'express';
const router = express.Router();

// Route imports
import { getUsers } from "./user.js";

// Configuring routes
router.route("/users").get(getUsers)

export { router }