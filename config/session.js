const sessions = require('express-session');


const sessionCofig = sessions(
  {
  secret:process.env.SECRET_KEY,        
  resave: false,                   
  saveUninitialized: false,         
  cookie: { maxAge: 1000 * 60 * 60 } 
  })



  module.exports = {
    sessionCofig
  }