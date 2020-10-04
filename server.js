const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('Database connection oke');
})

const PORT = process.env.PORT || 4001;

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})

const EmployeeRoute = require('./routes/employee');
const AuthRoute = require('./routes/auth');

app.use('/api/employee', EmployeeRoute);
app.use('/api', AuthRoute);