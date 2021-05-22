import {Team} from '../models/model'
import _ from 'lodash'


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
