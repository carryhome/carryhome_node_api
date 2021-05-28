import mongoose from 'mongoose'
import UserSchema from '../models/user'
import TeamSchema from '../models/team'
import {ObjectId} from 'mongodb'

const models = {
  User: mongoose.model('User', UserSchema),
  Team: mongoose.model('Team', TeamSchema),
}

// explicitly create each collection
// for Mongoose multi-document write support which is needed for transactions
Object.values(models).forEach(model => {
  model.createCollection()
})

//TODO :: Only for DEV releases
async function createDummyUsers(){
  let usersIntoInsert = [
    {lastName: 'test', firstName: 'User', email: 'user@gmail.com', password: 'user', userRole: 'ADMIN', tenantId: ObjectId('5f3d2af80ecdf67319658ac8')},
    {lastName: 'dev', firstName: 'admin', email: 'admin@gmail.com', password: 'admin123',  userRole: 'ADMIN', tenantId: ObjectId('5f3d2af80ecdf67319658ab8')},
  ]
  let User = models.User
  usersIntoInsert.forEach(async (newUser) => {
    let user = await User.findOne({email: newUser.email})
    if (user == null) await new User(newUser).save()
  })
}
createDummyUsers()
module.exports = {
  User: models.User,
  Team: models.Team,
}
