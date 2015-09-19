import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  userIds: [Schema.Types.ObjectId],
});

export default function getChanelModel() {
  return mongoose.model('Chanel', schema);
}
