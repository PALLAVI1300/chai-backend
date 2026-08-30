  import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

const jokes = [
  {
    id: 1,
    title: 'A joke',
    content: 'This is a joke'
  },
  {
    id: 2,
    title: 'Second joke',
    content: 'This is the second joke'
  },
  {
    id: 3,
    title: 'Third joke',
    content: 'This is the third joke'
  },
  {
    id: 4,
    title: 'Fourth joke',
    content: 'This is the fourth joke'
  },
  {
    id: 5,
    title: 'Fifth joke',
    content: 'This is the fifth joke'
  }
]

app.get('/', (req, res) => {
  res.send('Server is ready')
})

app.get('/api/jokes', (req, res) => {
  res.send(jokes)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})


 