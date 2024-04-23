import express from 'express';
import mongoose, { connect } from 'mongoose';
import cors from 'cors';
import { UserModel } from './models/Users.js';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/pashu")

app.get('/', (req,res)=>{
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id', (req,res)=> {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/createUser", (req,res) =>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {name : req.body.name, animal : req.body.animal, disease : req.body.disease})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})


app.listen(3001, ()=>{
    console.log("Server is running");
})