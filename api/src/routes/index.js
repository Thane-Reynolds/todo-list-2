import express from 'express';
const router = express.Router();

// Route imports
import { getUsers } from "./user.js";
import { getTodos } from './todo.js';

// Configuring routes
router.route("/users").get(getUsers);
router.route("/todos").get(getTodos);

export { router }