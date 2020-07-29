const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Knex = require('knex')

Knex({
    client: 'postgres',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Dipen@123',
      database : 'users'
    }
  });


const database = {
  users: [{
    id: '123',
    name: 'John',
    email: 'john@gmail.com',
    entries: 0,
    joined: new Date()
  }],
  secrets: {
    users_id: '123',
    hash: 'wghhh'
  }
}

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'))

app.post('/signin', (req, res) => {
  var a = JSON.parse(req.body);
  if (a.username === database.users[0].email && a.password === database.secrets.hash) {
    res.send('signed in');
  } else {
    res.json('access denied');
  }
})

app.post('/findface', (req, res) => {
  database.users.forEach(user => {
    if (user.email === req.body.email) {
      user.entries++
      res.json(user)
    }
  });
  res.json('nope')
})


app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  db('users').insert({
    email: email,
    name: name,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1])
})

app.get('/profile/:userId', (req, res) => {
  database.users.forEach(user => {
    if (user.id === req.params.userId) {
      return res.json(user);
    }
  })
  // res.json('no user')

})

app.listen(3000, () => console.log('App running on port 3000!'))