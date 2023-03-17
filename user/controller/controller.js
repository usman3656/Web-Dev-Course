const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

async function createUser(req, res) {
  try {
    const { first_name, last_name, age, email, password } = req.body;
    console.log("body", req.body);

    const userExists = await User.findOne({ email });

    if (!userExists) {
      const user = await User.create([
        {
          first_name,
          last_name,
          age,
          email,
          password,
        },
      ]);

      console.log("user created");

      const options = {
        expiresIn : '1hr',
        // issuer: 'pickurpage.com',
        // audience: user.id,
      };

      const secretKey = process.env.SECRET_KEY

      const token = jwt.sign({user}, secretKey, options);
      console.log(token);

      const refToken = jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "8hr"});
      console.log(token);

      res
        .cookie("access_token", token, {
          httpOnly: true,
        }).cookie("refreshToken", refToken, {
          httpOnly:true
        })
        .status(200)
        .send({
          message: "user created successfully",
          data: user,
        });
    } else {
      res.send("user already exists");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUser(req, res) {
  try {
    const { first_name, last_name, email } = req.query;
    console.log(req.body);
    let user;

    if (first_name) {
      user = await User.findOne({ first_name });
    } else if (last_name) {
      user = await User.findOne({ last_name });
    } else if (email) {
      user = await User.findOne({ email });
    }

    if (!user) {
      res.send("Invalid details");
    } else {
      res.send({
        message: "successfully fetched data",
        data: { user },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(req, res) {
  try {
    const { first_name, last_name, age, email, password } = req.body;
    console.log(req.body);

    const updatedUser = await User.updateOne(
      { email: email },
      { first_name, last_name, age, password }
    );

    res.send({
      message: "updated successfully",
      data: { updatedUser },
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(req, res) {
  try {
    // console.log("Deleted USer data",req.body);
    const {email} = req.body;
    // console.log(email);


    const result = await User.deleteOne({ email });

    res.clearCookie("access_token").status(200).send({
      message: "user deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
