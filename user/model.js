const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  first_name:{
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age:{
    type: Number,
    require: true,
  },
},
// { timestamps: true }
);

userSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, 10);
  next();
})

const User = mongoose.model("user", userSchema);

module.exports = User;