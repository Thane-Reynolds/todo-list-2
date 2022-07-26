import express from 'express';
const router = express.Router();

// Route imports
import { createUser, getUser, getUsers } from "./user.js";
import { createTodo, deleteTodo, getTodos, updateTodo } from './todo.js';
import { deleteCategory, getCategories, newCategory, updateCategory } from './category.js';

// Configuring routes
// user routes
router.route("/users").get(getUsers);
router.route("/user/:id").get(getUser); // all todos for a user
router.route("/user").post(createUser);
// todo routes
router.route("/todos").get(getTodos);
router.route("/todo").post(createTodo);
router.route("/todo/:id").put(updateTodo);
router.route('/todo/:id').delete(deleteTodo);
// category routes
router.route('/categories/:userID').get(getCategories);
router.route('/category').post(newCategory);
router.route('/category/:id').put(updateCategory);
router.route('/category/:id').delete(deleteCategory);
// location routes


export { router }