const express = require("express");
const app = express();
app.use(express.json());
var cors = require('cors');
// var port = process.env.PORT || 1337;
var port = 1337;
app.use(cors());

var data = ["gps", "rotate"]

  app.get("/", (req, res) => {
      res.send({running: true});
     });


  // running test ---------------------------------------
  app.get("/api", (req, res) => {
      res.send({running: true});
     });

  // save data from plane
  app.post("/api/send-data", (req, res) => {
    if (req.body.key == 1234) {
      if (req.body.data) {
         data = req.body.data;
        res.send(500);
      } else {
         res.send("data error");
      }
    } else {
      res.send("key error");
    }
  })

  // get data to pc
  app.post("/api/give-data", (req, res) => {
    if (req.body.key == 1234) {
      res.send(data);
    } else {
      res.send("error");
    }
   });


app.listen(port, () => console.log("Listening on port " + port + "..."));
