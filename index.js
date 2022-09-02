const express = require("express");
const app = express();
app.use(express.json());
var cors = require('cors');
var port = process.env.PORT || 1337;

app.use(cors());

var data = [[14.400307, 50.071853], "rotate", "height (sea)", [16.2593606, 50.3242377]]

  app.get("/", (req, res) => {
      res.send("ok");
     });


  // running test ---------------------------------------
  app.get("/api", (req, res) => {
      res.send("ok");
     });

  // save data from plane
  app.post("/api/send-from-plane", (req, res) => {
    if (req.body.key == 1234) {
      if (req.body.data) {
        for(let i = 0; i < req.body.data.length; i++) {
          data[i] = req.body.data[i];
        }
         
        res.send("ok");
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

// send place arrival from pc
app.post("/api/arrive-here", (req, res) => {
    if (req.body.key == 1234) {
      data[3] = req.body.data;
    } else {
      res.send("error");
    }
   });

app.listen(port, () => console.log("Listening on port " + port + "..."));
