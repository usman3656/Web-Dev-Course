const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role:{
    type: String,
    require: true,    
  }  
}
);

const Role = mongoose.model("Roles", roleSchema);

module.exports = Role;