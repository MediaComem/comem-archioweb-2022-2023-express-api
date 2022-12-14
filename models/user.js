import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import * as config from '../config.js';
const Schema = mongoose.Schema;

// Define the schema for users
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'manager']
  }
});

userSchema.virtual('password');

userSchema.pre('save', async function() {
  if (this.password) {
    const passwordHash = await bcrypt.hash(this.password, config.bcryptCostFactor);
    this.passwordHash = passwordHash;
  }
});

userSchema.set("toJSON", {
  transform: transformJsonUser
});

function transformJsonUser(doc, json, options) {
 // Remove the hashed password from the generated JSON.
 delete json.passwordHash;
 delete json.__v;
 json.id = json._id;
 delete json._id;
 return json;
}

// Create the model from the schema and export it
export default mongoose.model('User', userSchema);