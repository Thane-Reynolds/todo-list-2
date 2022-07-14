import 'dotenv/config'
import express from 'express'
import { PrismaClient } from '@prisma/client'

const PORT = process.env.PORT

const app = express()
const prisma = new PrismaClient()

async function getUsers(){
  return await prisma.user.findMany()
}


app.get('/api/users', async (req, res) => {
  const users = await getUsers().then((response) => response).catch((e)  => { throw e}).finally(async () => {await prisma.$disconnect()})
  
  console.log(users)

  res.json({users: users})

})

app.get('/', (req, res) => {
  res.send('API for Todo List app')
})

app.post('/', (req, res) => {
  res.send('wtf')
})

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`)
})

