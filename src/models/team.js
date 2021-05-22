import mongoose from 'mongoose'
const opts = { timestamps: { currentTime: () => Math.round(new Date().getTime()) }}

const TeamSchema = mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  photo: { type: String, required: true, trim: true },
  desgnation: { type: String, required: true, trim: true },
  expirence: { type: Number, required: true, },
  about: { type: String, trim: true },
  email: { type: String, required: true, trim: true },
}, opts)

module.exports = TeamSchema