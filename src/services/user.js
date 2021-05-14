import {User} from '../models/model'
import { generateToken} from '../security/auth'
import _ from 'lodash'

// const userFields = ['firstName', 'lastName' ]

/* get all users */
export async function  getUsers(req, res){
  const {limit, skip, page} = req.pagination
  const filterTenantRecord = req.filterTenantRecord || {}

  try {
    let [users] = await User.aggregate([
      {$match: filterTenantRecord},
      {'$facet': {
        meta: [ { $count: 'total' }, { $addFields: { page: page } } ],
        data: [ { $skip: skip }, { $limit: limit } ], 
      }},
      {$project:  global.paginationProject},
    ])
    if (_.isEmpty(users['data'])) res.status(404).send({status: 'error', message: 'record not found!'}) 
    else res.status(201).send(users)
  } catch(err) {
    res.status(500).send({status: 'error', message: err})
  }
}

/* user login */
export async function login(req, res){  
  try {
    let {email, password} = req.body
    if (!email || !password) return res.status(400).send({status: 'error', message: 'Please provide email and password!'})
   
    let user = await User.findOne({email: email}) 
    if (!user) return res.status(404).send({status: 'error', message : "User doesn't exist"})
    if (_.isUndefined(user.password)) return res.status(422).send({status: 'failed', message: 'Please reset your password'})
    if (!user['isActive']) return res.status(403).send({status: 'error', message: 'Your account marked as inActive, Please contact support team'})
    if (user['archived']) return res.status(403).send({status: 'error', message: 'Your account marked as deactivated, Please contact support team'})
    
    await generateToken(user, password, function (err, result) {
      let {statusCode, status, message, accessToken, tenantId} = result || err
      if (err) res.status(statusCode).send({status, message, accessToken, tenantId}) 
      else res.status(statusCode).send({status, message, accessToken, tenantId})
    }) 
  } catch(error) {
    res.status(500).send({status: 'error', message: 'server error, please try after sometime!'})
  } 
}
