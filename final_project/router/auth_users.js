const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){
        return true;
      } else {
        return false;
      }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let user = req.session.username;
  let review = req.query.review;
  let isbn = req.params.isbn;
  if(user in books[isbn]["reviews"]){
    books[isbn]["reviews"][user] = review
  }else{
    books[isbn]["reviews"][user] = review
  }

});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    let user = req.session.username;
    let isbn = req.params.isbn;
    if(user in books[isbn]["reviews"]){
      delete books[isbn]["reviews"][user]
    }else{
      return res.status(403).json({message: "No review existed"})
    }
  
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
