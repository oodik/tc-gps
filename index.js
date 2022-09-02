const express = require("express");
const app = express();
app.use(express.json());
var cors = require('cors');
// var port = process.env.PORT || 1337;
var port = 1337;
app.use(cors());


// new Date object


const mongoose = require('mongoose');
// const uri = process.env.MONGODB_URI;
const uri = "mongodb+srv://oodik:oOdik777@cluster0.vknsg.mongodb.net/ShoppingListApp?retryWrites=true&w=majority";


mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB... ', err));

  // running test ---------------------------------------
  app.get("/api", (req, res) => {
      res.send({running: true});
     });

     // UX app -------------------------------------------
     const AppSchema = new mongoose.Schema({
        login: String,
        password: String,
        shoptypes: [{}]  
      });   
      const SchemaUX = mongoose.model("AppUX", AppSchema);
      const schemaUX = new SchemaUX({
        login: "rodina",
        password: "1234",
        shoptypes: [
            {name:"Smíšené", icon: "<www>", link: "/api/find/:smisene"},
            {name:"Lékárna", icon: "<www>", link: "/api/find/:lekarna"},
            {name:"Drogerie", icon: "<www>", link: "/api/find/:drogerie"},
            {name:"Železářství", icon: "<www>", link: "/api/find/:zelezarstvi"},
            {name:"Elektro", icon: "<www>", link: "/api/find/:zelezarstvi"},
            {name:"Jiné", icon: "<www>", link: "/api/find/:jine"},
        ]
      });
      // schemaUX.save();



      // schema shopping list -----------------------------------
      const ListSchema = new mongoose.Schema({
        date: [],
        shopType: String,
        list: []
        
      })
      const SchemaList = mongoose.model("Data", ListSchema);

      
      // add new buy-list
  app.post("/api/add-buy", (req, res) => {
    let dateOb = new Date();

    const schemaList = new SchemaList({
      date: [Date.now(), dateOb.getDate() + "." + dateOb.getMonth() + "." + dateOb.getFullYear() + " " + dateOb.getHours() + ":" + dateOb.getMinutes()],
      shopType: req.body.shopType,
      list: req.body.list
    });

    schemaList.save();
    res.send(req.body.list)
  })


    // get concretly type by shop
  app.get("/api/find/:type", (req, res) => {
    const type = String(req.params.type)
    console.log(type)
    SchemaList.find({shopType: type}).then(result => {res.json(result)})
   });

  app.post("/api/delete/:id", (req, res) => {
    async function xxx() {

      // create new
      const id = String(req.params.id)
      SchemaList.findById(id).then(result => {
        if (result) {
        console.log(result.date)
        const schemaListtt = new SchemaList({
          date: result.date,
          shopType: req.body.shopType,
          list: req.body.list
        });
    
        schemaListtt.save();
      }
      });
    }
    xxx()
    // delete
    SchemaList.findByIdAndDelete(req.params.id).then(result => {
      if (result)
          res.json(result);
      else
          res.status(404).send("Seznam s daným id nebyl nalezen!");
  })})

 app.get("/api/login", (req, res) => {
  SchemaUX.find().then(result => {res.json([result[0].login, result[0].password])});
 })

app.listen(port, () => console.log("Listening on port " + port + "..."));