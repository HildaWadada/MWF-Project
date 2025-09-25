//1. DEPENDENCIES
const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
const MongoStore = require("connect-mongo");

require('dotenv').config();
// const signupModel = require("./models/signupModel");


// IMPORT ROUTES
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const employeesRoutes = require("./routes/employeesRoutes");
const productsRoutes = require("./routes/productsRoutes");
const salesrecordsRoutes = require("./routes/salesrecordsRoutes");
const salesRoutes = require("./routes/salesRoutes");
const signupRoutes = require("./routes/signupRoutes");
const stockRoutes = require("./routes/stockRoutes");
const usersRoutes = require("./routes/usersRoutes");
const stockformRoutes = require("./routes/stockformRoutes");



// INSTATIATIONS
const app = express();
const port = 3001;

//2.CONFIGURATIONS
const moment = require("moment"); 
// Setting up mongodb connection
mongoose.connect(process.env.MONGODB_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

// Setting view engine to pug
app.set('view engine', 'pug');
app.set('views', './views');

//3. MIDDLEWARE
// app.use(express.static('public')); //static files
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true})); //helps to pass data from forms
// Express-Session configs
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: process.env.MONGODB_URL}),
  cookie: {maxAge:24*60*60*1000}, //one day
}))
// Passport configs
app.use(passport.initialize());
app.use(passport.session());

// Authentcate with passport local strategy
// passport.use(UserModel.createStrategy());
// passport.serializeUser(UserModel.serializeUser());
// passport.deserializeUser(UserModel.deserializeUser());


// ROUTES
app.use("/",authRoutes);
app.use("/",dashboardRoutes);
app.use("/",employeesRoutes);
app.use("/",productsRoutes);
app.use("/",salesrecordsRoutes);
app.use("/",salesRoutes);
app.use("/",signupRoutes);
app.use("/",stockRoutes);
app.use("/",usersRoutes);
app.use("/",stockformRoutes);


app.use((req,res) => {
    res.status(404).send('404 damn,shit aint working');
});

// bootstrapping server
app.listen(port, () => console.log(`listen on port ${port}`));