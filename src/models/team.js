import mongoose from 'mongoose'
const opts = { timestamps: { currentTime: () => Math.round(new Date().getTime()) }}

const TeamSchema = mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    designation: { type: String, required: true, trim: true },
    experience: { type: Number, required: true },
    about: { type: String, required: true, trim: true },
}, opts) 
  

module.exports = TeamSchema
