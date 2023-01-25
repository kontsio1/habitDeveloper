const { ADDRGETNETWORKPARAMS } = require("dns");
const User = require("../models/UserSetUpModel");
const { findUser, saveNewUser, updateChallenge, inputJournalEntry, getJournalEntriesInfo, getFilterJournalInfo } = require("../models/UserDataModels")


exports.addUser = (req,res, next) =>{
    const {username, email, password} = req.body;

   saveNewUser(username, email, password)
   .then((user)=>{
    res.status(201).send(user)
   })
    .catch((err)=>{
        next(err)    
    })
}

exports.getUser = (req, res, next) =>{
    const {password, email} = req.params;
    findUser(password, email)
    .then((user)=>{
        res.status(200).send(user);
    })
    .catch((err)=>{
        next(err);
    })
}


exports.addJournalEntry = (req, res, next) =>{
    const {username} = req.params;
    const journalEntry = req.body;
    inputJournalEntry(username, journalEntry)
    .then((result)=>{
        res.status(201).send(result);
    })
    .catch((err)=>{
        next(err);
    })
}


exports.patchChallenge = (req, res, next) => {
    const { username } = req.params;
    updateChallenge(username, req.body)
        .then( (user) => {
            res.status(200).send( user);
        })
        .catch( (err) => {
            next(err);
        })
}

//get journal entries, sort by date
exports.getJournalEntries = (req,res,next) => {
    const {username} = req.params;
    const {order} = req.query;

    getJournalEntriesInfo(username,order)
    .then((journalEntries) =>{
        res.status(200).send(journalEntries)
    })
    .catch ((err) => {
        next(err)
    })
}

//get journal entries, filter by challenge, sort by date
exports.getFilterJournal  = (req,res,next) => {
    const {username} = req.params;
    const {challenge, order} = req.query;

    getFilterJournalInfo(username,challenge,order)
    .then((journalEntries) =>{
        res.status(200).send(journalEntries)
    })
    .catch((err) => {
        next(err)
    })
}