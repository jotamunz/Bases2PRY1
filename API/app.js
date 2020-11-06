const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');

mongoose.connect(process.env.DB_CONNECTION,
    {useUnifiedTopology: true, useNewUrlParser: true},
    () => {console.log('connected to DB')}
);

//Middleware
app.use(cors());

app.use(
    express.urlencoded({
      extended: true
    })
  );
app.use(express.json());



// server listening in port 3000
app.listen(3000);