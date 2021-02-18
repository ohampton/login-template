const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const passport = require('passport')
const MongoClient = require('mongodb').MongoClient;
const { request } = require('express');
require('dotenv').config();
// getting credential to connect to db
// username = process.env.USERNAME
// console.log(username)
// password = process.env.PASSWORD
connectionString = 'mongodb+srv://Pidge:Greenlion@cluster0.r568t.mongodb.net/test?retryWrites=true&w=majority'
console.log(connectionString);
// port # from .env
port = process.env.PORT;

// connection to mongoDB
MongoClient.connect(connectionString,{useUnifiedTopology: true}) .then(client => {

  const db = client.db('loginTemplate');
  const quotesCollections = db.collection('UserLogin');
  console.log('connected to database');

  app.set('view engine', 'ejs')
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


// Add all the CRUD here!

  // Get Method For Login Page

  app.get('/',  (req, res) => {
    res.render('index.ejs', {name: req.user})
  })
  
  app.get('/login', (req, res) => {
    res.render('index.ejs')
  })

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/createAccount',  (req, res) => {
    res.render('index.ejs')
  })
  
  app.post('/createAccount', async (req, res) => {
    try {
      // const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: request.body.confirmPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/createAccount')
    }
  })

  // app.get('/', (req, res) => {
  //   db.collection('userLogin').find().toArray()
  //     .then(results => {
  //       res.render('index.ejs', { login: results})
  //       console.log(results)
  //     })
  //     .catch(/* ... */)
      
  // })
  // app.get('/', (req, res) => {
  //     data = db.collection('userLogin').find().toArray();
  //     data.then(result => res.render
  //     .catch(error => console.error(error));
  // })
        
  // app.get('/createAccount', (req, res) =>{
  //   data = db.collection('userLogin').find().toArray();
  //   data.then(result => res.send(result))
  //   .catch(error => console.error(error));
  // })
      
      // Post Method
// app.post('/createAccount', (req, res) => {
//   data = db.collection('userLogin').insertOne(req.body);
//   data.then(result => res.redirect('/'))
//   .catch(error => console.error(error));
// })


// app.get('/', (req, res) => {
//   db.collection('CreateAccount').find().toArray()
//     .then(results => {
//       res.render('index.ejs', { login : results})
//       console.log(results)
//     })
//     .catch(/* ... */)
    
// })

// app.get('/login', (req, res) =>{
//   data = db.collection('userLogin').find().toArray();
//   data.then(result => res.send(result))
//   .catch(error => console.error(error));
// })
    
//     // Post Method
// app.post('/login', (req, res) => {
// data = db.collection('userLogin').insertOne(req.body);
// data.then(result => res.redirect('/'))
// .catch(error => console.error(error));
// })










// app.put('/login/:id', (req, res) => {
//   if (req.body.id) {
//     data = db.collection('userLogin').findOneAndUpdate(
//     { id: req.body.id },
//     {
//       $set: {
//         assignedTo: req.body.assignedTo,
//         ticketDetails: req.body.ticketDetails
//       }
//     },
//     {
//       upsert: true
//     }
//   )
//     data.then(result => {
//       res.json('Ticket updated')
//     })
//     .catch(error => console.error(error))
//   } else {
//     data = db.collection('login').findOneAndUpdate(
//       { id: req.body.id },
//       {
//         $set: {
//           assignedTo: req.body.assignedTo,
//         }
//       },
//       {
//         upsert: true
//       }
//     )
//       data.then(result => {
//         res.json('Ticket updated')
//   })
//     .catch(error => console.error(error))
//   }
// })

// app.delete('/login/:id', (req, res) => {
//     data = db.collection('login').deleteOne(
//     {   
//         id: req.body.id ,
//         name: req.body.name,
//         type: req.body.type,
//         requestDate: req.body.requestDate, 
//         assignedTo: req.body.assignedTo,
//         ticketDetails: req.body.ticketDetails
//       }
//     )
//       data.then(result => {
//         if (result.deleteCount === 0){
//           return res.json('No ticket to delete')
//         }
//       res.json('Ticket deleted')
//     })
//     .catch(error => console.error(error))
//   })

  // localhost
  app.listen(port, function() {
    console.log(`listening on: http://localhost:${port}`)
  })
})
  .catch(error => console.error(error))
