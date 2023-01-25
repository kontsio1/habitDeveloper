const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/UserSetUpModel");
const { req, res } = require('express');
const {handleCustomErrors} = require('./controllers/errorController')

const { addUser, getUser, patchChallenge, addJournalEntry} = require('./controllers/UserDataControllers');
var ObjectID = require('mongodb').ObjectID;

const app = express();	
app.use(express.json());

const uri = "mongodb+srv://theFantastic5:theFantastic54321@habitdeveloper.m1vjjrl.mongodb.net/habitDev?retryWrites=true&w=majority";
mongoose.connect(uri)
.then((result)=>{
     console.log("connected to db")
     app.listen(3006);
})
.catch((err)=>{
     console.log(err);
})

app.post('/user', addUser)

app.get('/user/:email/:password', getUser)

app.patch('/journal/:username', addJournalEntry)
app.patch('/challenges/:username', patchChallenge)
app.use(handleCustomErrors);

module.exports = app;