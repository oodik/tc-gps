const express = require("express");
const app = express();
app.use(express.json());
var cors = require('cors');
var port = process.env.PORT || 1337;

app.use(cors());

// data - gps (plane now), height under sea (m), compass (degrees from N), distance from lander place (horizontal, m), speed (horizontal, m/s), speed of sinking (m/s)
var data = [[50.2847306, 16.2360281], 800, 15, 7000, 5, 1, "na zemi!", [50.2807306, 16.2310281]]

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
      data[7] = req.body.data;
    } else {
      res.send("error");
    }
   });

  // plane req to arrive place
  app.get("/api/where-arrive", (req, res) => {
    function countDirection(to, where) {
      
    let paraller = (to[0] - where[1])/360 * 40075
    let medirian = (to[0] - where[1])/180 * 40075
    let degrees = 0
    
    // Quadrant check
    if (paraller < 0 && medirian > 0) {
      degrees = 90 
    } else if (paraller < 0 && medirian < 0) {
      degrees = 180
    } else if (paraller > 0 && medirian < 0) {
      degrees = 270
    } 
    
    console.log([Math.abs(medirian), Math.abs(paraller)])
    degrees = degrees + (Math.atan(Math.abs(medirian)/Math.abs(paraller))) * 180 / Math.PI
      
    
    return([degrees, "xxx"])
    
    
  
}
      res.send(countDirection(data[7], data[0]));
     });



app.listen(port, () => console.log("Listening on port " + port + "..."));
