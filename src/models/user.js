import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const opts = { timestamps: { currentTime: () => Math.round(new Date().getTime()) }}

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId,  ref: 'Tenant', required: true, trim: true, index: true },
  email: { type: String, required: true, unique: true, trim: true },
}, opts) 

UserSchema.methods.toJSON = function() {
  // eslint-disable-next-line no-unused-vars
  const {password, ...rest} = this.toObject()
  return rest
}

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password).then((result)=>{
    if (result) cb(null, 'authentication successful')
    else cb("authentication failed. Password doesn't match")
  }).catch((err)=>cb(err))
}


UserSchema.statics.getAuthenticated = function(user, password, cb) {
  user.comparePassword(password, function(err, result) {
    if (err) cb(err)
    else cb(err, result)
  })
}

UserSchema.pre('save', function(next) {
  let user = this 
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR), function(err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {  
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

module.exports = UserSchema
