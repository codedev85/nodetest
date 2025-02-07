const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    }
  },
  {
    timestamps: true 
  }
);

userSchema.set("toJSON", {
  transform: function (doc, ret) {
      delete ret.password;
      return ret;
  },
});

const User = mongoose.model("User", userSchema);

module.exports =  User;

