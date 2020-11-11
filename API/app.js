const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


// Middleware
app.use(cors());

app.use(
    express.urlencoded({
      extended: true
    })
  );
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION,
  {useUnifiedTopology: true, useNewUrlParser: true},
  () => {console.log('connected to DB')}
);


// Routes imports
const userRoute = require ('./Routes/users');

app.use('/users', userRoute);



// server listening in port 3000
app.listen(3000);

