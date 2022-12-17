const express = require("express");
const app = express();
const multer = require("multer");
const path = require('path');
const userRoute = express.Router();
let User = require("../model/user");

app.get((req, res) => {
  res.send("Welcome to server !");
});

const Storage = multer.diskStorage({
  destination: './uploads/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: Storage
})

userRoute.use('/file', express.static('uploads/images'));

// // Upload image
// userRoute.post("/upload", upload.single('file'), (req, res) => {
//   console.log('req.file : ', req.file);
// });

// Create/Add user
// userRoute.route("/add-user").post((req, res, next) => {
userRoute.post("/add-user", upload.single('file'), (req, res, next) => {
  let userDetails = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    file: req.file.filename,
  });

  userDetails.save().then(
    () => {
      res.status(201).json({
        message: 'Data saved successfully!',
        profileUrl: `http://localhost:8000/api/file/${req.file.filename}`
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
      console.log('error ', error)
    }
  );
});

// Get all users
userRoute.route("/").get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get user by id
userRoute.route("/edit-user/:id").get((req, res, next) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update user by id
// userRoute.route("/update-user/:id").put((req, res, next) => {
userRoute.put("/update-user/:id", upload.single('file'), (req, res, next) => {
  let updatedUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    file: req.file.filename,
  }
  console.log('updatedUser ', updatedUser);
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: updatedUser,
    },
    (error, data) => {
      if (error) {
        console.log('error on update data : ', error);
        return next(error);
      } else {
        res.json(data);
        console.log("User updated successfully");
      }
    }
  );
});

// Delete user by id
userRoute.route("/delete-user/:id").delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = userRoute;
