import 'dotenv/config'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { router } from './routes/index.js'

const PORT = process.env.PORT

const app = express()
const prisma = new PrismaClient()

async function getUsers(){
  return await prisma.user.findMany()
}


app.use('/api', router)

app.get('/', (req, res) => {
  res.send('API for Todo List app')
})

app.post('/', (req, res) => {
  res.send('wtf')
})

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`)
})

