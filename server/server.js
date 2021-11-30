const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

mongoose.connect(process.env.ATLAS);

const repSchema = new mongoose.Schema({
  oname: String,
  rname: String,
});

const Rep = mongoose.model("Rep", repSchema);

const userSchema = new mongoose.Schema({
  user_id: String,
  repositories: [repSchema],
});

const User = mongoose.model("User", userSchema);

app.post("/add", async (req, res) => {
  const newRep = new Rep({
    oname: req.body.oname,
    rname: req.body.rname,
  });

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${newRep.oname}/${newRep.rname}`,
      {
        headers: {
          Authorization: process.env.GITHUB_TOKEN,
        },
      }
    );

    if (response.status == 200) {
      User.findOne({ user_id: req.body.user_id }, function (err, foundUser) {
        if (!foundUser) {
          const newUser = new User({
            user_id: req.body.user_id,
            repositories: [newRep],
          });
          newUser.save();
          res.send("added");
        } else {
          let i;
          let check = false;
          for (i = 0; i < foundUser.repositories.length; i++) {
            if (
              (foundUser.repositories[i].oname === newRep.oname) &
              (foundUser.repositories[i].rname === newRep.rname)
            ) {
              check = true;
              break;
            }
          }

          if (!check) {
            foundUser.repositories.push(newRep);
            foundUser.save();
            res.send("added");
          } else {
            res.send("already exists");
          }
        }
      });
    } else {
      res.send("error");
    }
  } catch {
    res.send("doesn't exist");
  }
});

app.post("/getreps", async (req, res) => {
  User.findOne({ user_id: req.body.user_id }, function (err, foundUser) {
    if (!foundUser) {
      res.send([]);
    } else {
      res.send(foundUser.repositories);
    }
  });
});

app.post("/delete", async (req, res) => {
  User.findOne({ user_id: req.body.user_id }, function (err, foundUser) {
    if (foundUser) {
      foundUser.repositories.pull({ _id: req.body.rep_id });
      foundUser.save();
      res.send("deleted");
    } else {
      res.send("not deleted");
    }
  });
});

app.post("/branches", async (req, res) => {
  const rep = {
    oname: req.body.oname,
    rname: req.body.rname,
  };

  try {
    if (rep.oname !== "") {
      const response = await axios.get(
        `https://api.github.com/repos/${rep.oname}/${rep.rname}/branches`,
        {
          headers: {
            Authorization: process.env.GITHUB_TOKEN,
          },
        }
      );

      if (response.status == 200) {
        res.send(response.data);
      } else {
        res.send("error");
      }
    }
  } catch {}
});

app.post("/issues", async (req, res) => {
  const rep = {
    oname: req.body.oname,
    rname: req.body.rname,
  };

  try {
    if (rep.oname !== "") {
      const response = await axios.get(
        `https://api.github.com/repos/${rep.oname}/${rep.rname}/issues`,
        {
          headers: {
            Authorization: process.env.GITHUB_TOKEN,
          },
        }
      );

      if (response.status == 200) {
        res.send(response.data);
      } else {
        res.send("error");
      }
    }
  } catch {}
});

app.post("/commits", async (req, res) => {
  const rep = {
    oname: req.body.oname,
    rname: req.body.rname,
    bname: req.body.bname,
  };

  try {
    if (rep.oname !== "") {
      const response = await axios.get(
        `https://api.github.com/repos/${rep.oname}/${rep.rname}/commits?sha=${rep.bname}`,
        {
          headers: {
            Authorization: process.env.GITHUB_TOKEN,
          },
        }
      );

      if (response.status == 200) {
        res.send(response.data);
      } else {
        res.send("error");
      }
    }
  } catch {}
});

app.listen(5000, () => {
  console.log("Server is up on 5000");
});
