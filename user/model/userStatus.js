const mongoose = require("mongoose");

const userStatusSchema = new mongoose.Schema({
  userStatus:{
    type: String,
    require: true,    
  }  
}
);

const UserStatus = mongoose.model("UserStatus", userStatusSchema);

module.exports = UserStatus;