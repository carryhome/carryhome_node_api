import {Team} from '../models/model'
import _ from 'lodash'

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
    res.status(201).send(await Team.find())
  } catch(err) {
    res.status(500).send({status: 'error', message: err})
  }
}


export async function  updateTeam(req, res){
  try {
    res.status(201).send(await Team.find())
  } catch(err) {
    res.status(500).send({status: 'error', message: err})
  }
}


export async function  deleteTeam(req, res){
  try {
    res.status(201).send(await Team.find())
  } catch(err) {
    res.status(500).send({status: 'error', message: err})
  }
}


export async function  createTeam(req, res){
  try {
    res.status(201).send(await Team.find())
  } catch(err) {
    res.status(500).send({status: 'error', message: err})
  }
}