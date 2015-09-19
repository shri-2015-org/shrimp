import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nick: String,
  name: String,
  avatar: String,
  isOnline: Boolean,
});

export default function getUserModel() {
  return mongoose.model('User', schema);
}
