const bodyParser = require('body-parser');
var express = require('express');
var app = express();
require('dotenv').config();



//to parse user data
app.use(bodyParser.urlencoded({ extended: false }));

// // get data using post 
app.post("/name",(req, res) =>{
    let name = (`${req.body.first} ${req.body.last}`);
    res.json({ "name": name })
  });
  

//get query from client
app.get("/name",(req, res) =>{
  req.firstname = req.query.first;
  req.lastname = req.query.last;
  res.json({ "name": `${req.firstname} ${req.lastname}` })
});


//get route param inputs from client
app.get("/:word/echo",(req, res) =>{
  req.word = req.params.word;
  res.json({ "echo": req.word })
})


//middleware with a specfic route
app.get("/now",  (req, res, next) => {
  req.time = new Date().toString();
  next();
  },
  function(req, res){
    res.json({ "time": req.time});
  }
);


//writting a middle ware: with app.use all path we be listened to.
app.use(function (req, res, next){
  let source = `${req.method} ${req.path} - ${req.ip}`;
  console.log(source);
  next();
});

//usng JSON

app.get("/json", function (req, res) {
  // console.log(process.env.MESSAGE_STYLE)

  if (process.env.MESSAGE_STYLE === 'uppercase') {
     return res.json({ "message": "HELLO JSON" });
  }
    else {
     return res.json({ "message": "Hello json" });  
    }
});


//HOW to handle route using app.get
app.get('/', function(req, res){
  res.send('Hello Express')
});

console.log('Hello World')

//to access just the public route
app.use('/public',express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/views/index.html');
});




 module.exports = app;
