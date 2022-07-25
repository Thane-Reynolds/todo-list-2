import express from 'express';
const router = express.Router();

// Route imports
import { createUser, getUsers } from "./user.js";
import { createTodo, deleteTodo, getTodos, updateTodo } from './todo.js';

// Configuring routes
  // user routes
router.route("/users").get(getUsers);
router.route("/user").post(createUser);
  // todo routes
router.route("/todos").get(getTodos);
router.route("/todo").post(createTodo);
router.route("/todo/:id").put(updateTodo);
router.route('/todo/:id').delete(deleteTodo);


export { router }