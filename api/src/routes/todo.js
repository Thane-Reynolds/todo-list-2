import {prisma} from '../lib/db.js'

async function queryTodos(){
  return await prisma.todo.findMany();
}

export async function getTodos(req, res){
  const todos = await queryTodos()
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