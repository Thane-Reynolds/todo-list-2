import 'dotenv/config'
import express from 'express'
const app = express()
const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('API for Todo List app')
})

app.post('/', (req, res) => {
  res.send('wtf')
})

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`)
})