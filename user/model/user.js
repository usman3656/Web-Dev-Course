const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  roleID:{
    type: mongoose.Types.ObjectId,
    ref: "Roles",
    required: true,
  },
  userStatusID:{
    type: mongoose.Types.ObjectId,
    ref:"UserStatus",
    required:true
  }
}
);

userSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, 10);
  next();
})

const User = mongoose.model("Users", userSchema);

module.exports = User;