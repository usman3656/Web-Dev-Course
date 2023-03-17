const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  firstName:{
    type: String   
  },
  lastName:{
    type: String
  },
  Phone:{
    type: Number
  },
  userID:{
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  addressID:{
    type: mongoose.Types.ObjectId,
    ref: "Addresses"    
  }
}
);

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;