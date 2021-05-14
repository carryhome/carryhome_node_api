import jwt from 'jsonwebtoken'
import {User} from '../models/model'
import {roles} from './roles'

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({'status': 'error', 'message': 'Kindly login to access this resource'})
        req.user = decoded
        next()
      })
    }
  } catch(err) {
    res.status(401).json({ 'status': 'error', 'message': 'Kindly login to access this resource'})
  }
}

async function setToken(user) {
  const token_payload ={ userRole: user.userRole, _id: user._id, tenantId: user.tenantId }
  const accessToken = jwt.sign(token_payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFE })
  return accessToken
}

export async function generateToken(user, password, cb){
  User.getAuthenticated(user, password, async function(err) {
    if (err) return cb({statusCode: 403, status: 'error', message: err})
    const accessToken = await setToken(user)
    cb(err, {statusCode: 200, status: 'success', message: 'Bearer token generated!', accessToken, tenantId: user.tenantId})
  }) 
}

/* Grant Role based access control*/
export const grantAccess = (action, resource) => {   
  return async (req, res, next) => {
    try { 
      var role = req.user.userRole
      const permission = roles.can(role)[action](resource)
      if (!permission.granted) return res.status(403).json({status: 'error', message: `${role} role don't have enough permission to perform this action`})
      next()
    } catch (error) {
      return res.status(403).json({status: 'error', message: `${role} permission not granted!, error: ${error}`})
    }
  }
}


//
