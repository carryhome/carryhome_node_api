import {Team} from '../models/model'
import _ from 'lodash'
import {ObjectId} from 'mongodb' 

/* get all teams */
export async function  getTeams(req, res){
  try {
    res.status(201).send(await Team.find())
  } catch(err) {
    res.status(500).send({status: 'error', message: err})
  }
}

export async function  getSingleTeam(req, res){
  try {
    let query = {_id: ObjectId(req.params._id)}
    if (!_.isUndefined(req.query.fullName))
      query.fullName = req.query.fullName
    let temp = await Team.findOne(query)
    res.status(201).send(temp)
  } catch(err) {
    res.status(500).send({status: 'error', message: err})
  }
}

export async function  updateTeam(req, res){
  try {
    let ObjectToUpdate = ['fullName', 'email']
    let updateObject  = _.pick(req.body, ObjectToUpdate)
    let result = await Team.findOneAndUpdate({_id: req.params._id}, updateObject, {new: true})
    res.status(201).send(result)
  } catch(err) {
    res.status(500).send({status: 'error', message: err})
  }
}


export async function  deleteTeam(req, res){
  try {
    let query = {_id: ObjectId(req.params._id)}
    res.status(201).send(await Team.findOneAndDelete(query))
  } catch(err) {
    res.status(500).send({status: 'error', message: err})
  }
}


export async function  createTeam(req, res){
  try {
    let ObjectToTeam = ['firstName', 'email', 'designation', 'experience', 'about']
    let createTeam  = _.pick(req.body, ObjectToTeam)
    let result = await Team.create(createTeam)
    res.status(201).send("New member added to team")
  } catch(err) {
    res.status(500).send({status: 'error', message: err})
  }
}