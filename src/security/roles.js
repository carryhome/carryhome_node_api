/* Roles assumption:
 1. ORG_ADMIN extends ORG_AGENT, ORG_SUPPORT, ORG_TECH
 2. ADMIN extends all role except SUPER_ADMIN
 3. SUPER_ADMIN extends all roles
*/
'use strict'
import _ from 'lodash'
import {ObjectId} from 'mongodb'
import AccessControl from 'accesscontrol'
const ac = new AccessControl()

const roles = function() { 
  /* for organization specific roles */
  ac.grant('ORG_USER')

  ac.grant('ORG_ADMIN')
    .extend([ 'ORG_USER'])
    .readAny(['user'])

  /* carryhome defined roles */
  ac.grant('ADMIN')
    .extend(['ORG_ADMIN'])

  ac.grant('SUPER_ADMIN')
    .extend(['ADMIN'])
  
  return ac
}()

/* Role in desc order priority */
const ROLE_ENUM = ['SUPER_ADMIN', 'ADMIN', 'ORG_ADMIN', 'ORG_USER']
const DEFAULT_ROLE = 'ORG_USER'


const carryhomeRoles = [
  'ADMIN', 
  'SUPER_ADMIN',
]

const orgRoles = [
  'ORG_USER',
  'ORG_ADMIN',
]

const allowedRoles = [
  'ORG_ADMIN',
  'ADMIN', 
  'SUPER_ADMIN',
]

const allRoles = [
  'ORG_USER',
  'ORG_ADMIN',
  'ADMIN', 
  'SUPER_ADMIN',
]

Object.freeze(carryhomeRoles)
Object.freeze(orgRoles)
Object.freeze(allowedRoles)
Object.freeze(allRoles)


export async function filterTenantRecord(req, res, next){
  try {
    if (!_.isUndefined(req.header('Authorization'))) {
      let rank = req.user.userRole.find(v => ROLE_ENUM.includes(v))
      if (!carryhomeRoles.includes(rank)) req.filterTenantRecord = {tenantId: ObjectId(req.user.tenantId)}  
    }
    next()
  } catch(err) {
    return res.status(500).send({status : 'error', message: `Error: Not valid parameters, ${err.message}`})
  }
}

module.exports = {
  ROLE_ENUM: ROLE_ENUM,
  DEFAULT_ROLE: DEFAULT_ROLE,
  roles: roles,
  filterTenantRecord: filterTenantRecord,
  carryhomeRole : carryhomeRoles,
  orgRole: orgRoles,
  allowedRoles: allowedRoles,
  allRole: allRoles,
}
