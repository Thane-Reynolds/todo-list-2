import {prisma} from '../lib/db.js'
import { z } from 'zod'

async function queryTodos(params){
  const id = parseInt(params.userID)
  return await prisma.todo.findMany({
    where:{
      userID: id
    },
    include: {
      category: true,
      location: true
    }
  });
}

export async function getTodos(req, res){
  const todos = await queryTodos(req.params)
    .then(response => response)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  console.log(todos);
  
  res.json({ todos: todos })
}

// function for creating a new todo
export async function createTodo(req, res){
  const dateSchema = z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) {
      return new Date(arg);
    }
  }, z.date());
  const todoSchema = z.object({
    todoName: z.string(),
    dueDate: z.optional(dateSchema),
    completed: z.optional(z.boolean()),
    userID: z.number(),
    catID: z.number().optional(),
    locID: z.number().optional(),
  });
  console.log("incoming request",req.body) // testing to make sure its coming through correct
  if(!req.body || !todoSchema.parse(req.body)){
    res.status(400).send('todoName and userID required')
    return
  }
  const todo = await prisma.todo.create({
    data: {
      todoName: req.body.todoName,
      dueDate: (req.body.dueDate ? req.body.dueDate : null),
      completed: (req.body.completed ? req.body.completed : false),
      userID: req.body.userID,
      catID: req.body.catID,
      locID: req.body.locID
    }
  })
  res.json({ todo: todo})
}

// function for updating a todo
export async function updateTodo(req, res){
  const dateSchema = z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date){
      return new Date(arg);
    }
  }, z.date());
  const todoSchema = z.object({
    todoName: z.string(),
    dueDate: z.optional(dateSchema),
    completed: z.optional(z.boolean()),
    userID: z.number(),
    catID: z.number().optional(),
    locID: z.number().optional(),
  });
  if (
    !req.body ||
    !todoSchema.parse(req.body)
  ) {
    res.status(400).send('error in format');
    return;
  }
  const todoID = parseInt(req.params.id)
  const todo = await prisma.todo.update({
    where: { id: todoID },
    data: {
      todoName: req.body.todoName,
      dueDate: req.body.dueDate ? req.body.dueDate : null,
      completed: req.body.completed ? req.body.completed : false,
      userID: req.body.userID,
      catID: req.body.catID ? req.body.catID : null,
      locID: req.body.locID ? req.body.locID : null,
    },
  });
  res.json({ todo: todo });
}

// function for deleting a todo
export async function deleteTodo(req, res){
  const todoID = parseInt(req.params.id)
  const todo = await prisma.todo.delete({
    where: { id: todoID}
  })
  res.send('Entry deleted')
}