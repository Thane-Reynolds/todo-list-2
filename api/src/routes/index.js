import express from 'express';
const router = express.Router();

// Route imports
import { createUser, getUser, getUsers } from "./user.js";
import { createTodo, deleteTodo, getTodos, updateTodo } from './todo.js';
import { createCategory, deleteCategory, getCategories, updateCategory } from './category.js';
import { createLocation, deleteLocation, getLocations, updateLocation } from './location.js'

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
router.route('/category').post(createCategory);
router.route('/category/:id').put(updateCategory);
router.route('/category/:id').delete(deleteCategory);

// location routes
router.route('/locations/:userID').get(getLocations);
router.route('/location').post(createLocation);
router.route('/location/:id').put(updateLocation);
router.route('/location/:id').delete(deleteLocation);

export { router }