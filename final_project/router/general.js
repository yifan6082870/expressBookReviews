const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let p = new Promise((resolve, reject) => {
    res.send(JSON.stringify(books, null, 4));
    resolve("Sent");
  })

  p.then(
    (resolveMessage) => {console.log(resolveMessage)} 
  )
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let p = new Promise((resolve, reject) => {
    let isbn = req.params.isbn;
    res.send(JSON.stringify(books[isbn], null, 4));
    resolve("Sent");
  })

  p.then(
    (resolveMessage) => {console.log(resolveMessage)} 
  )

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let p = new Promise((resolve, reject) => {
    let author = req.params.author;
    b = {};
    for(var book in books){
        if(books[book]["author"] === author){
            b[book] = books[book];
        }
    }
    res.send(JSON.stringify(b, null, 4));
    resolve("Sent");
  })

  p.then(
    (resolveMessage) => {console.log(resolveMessage)} 
  )
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let p = new Promise((resolve, reject) => {
    let title = req.params.title;
    b = {};
    for(var book in books){
      if(books[book]["title"] === title){
          b[book] = books[book];
      }
    }
    res.send(JSON.stringify(b, null, 4));
    resolve("Sent");
  })

  p.then(
    (resolveMessage) => {console.log(resolveMessage)} 
  )
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  res.send(books[isbn]["review"]);
});

module.exports.general = public_users;
