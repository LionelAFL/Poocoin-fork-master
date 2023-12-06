let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
// Express Route
const tokenRoute = require('./routes/token.route')
const lpaddrRoute = require('./routes/address.route')
var url = "mongodb+srv://kinarkhelp:HCwbh2cUu6yCt3Sk@cluster0.3hpzivh.mongodb.net/?retryWrites=true&w=majority";

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/token', tokenRoute)
app.use('/lp_address', lpaddrRoute)

// PORT
const port = process.env.PORT || 5000;

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

app.listen(port, () => {
  console.log('Connected to port ' + port)
})