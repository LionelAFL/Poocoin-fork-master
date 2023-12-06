const ethers = require("ethers");
const Web3 = require("web3");

// var provider = new ethers.providers.WebSocketProvider('wss://bsc-ws-node.nariox.org:443');
const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org"
);
var web3 = new Web3(
  new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org")
);

const getLogsAddress = "0xca143ce32fe78f1f7019d7d551a6402fc5350c73"; // pancakeswap factory address
const topics =
  "0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9";

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5001;


app.use(cors());

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

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

let fromBlock = 0;
web3.eth.getBlockNumber().then((blockNumber) => {
  fromBlock = (blockNumber - 1000).toString(16);

  web3.eth
    .subscribe(
      "logs",
      {
        address: getLogsAddress,
        fromBlock: "0x" + fromBlock,
        toBlock: "latest",
        topics: [topics],
      },
      function (error, result) {
        //   if (!error)
        //       console.log(result);
      }
    )
    .on("connected", function (subscriptionId) {
      console.log("subcriptionID === " + subscriptionId);
    })
    .on("data", function (log) {
      // console.log(log);

      let item = web3.eth.abi.decodeLog(
        [
          {
            type: "string",
            name: "topicsAddress",
            indexed: true,
          },
          {
            type: "address",
            name: "from",
            indexed: true,
          },
          {
            type: "address",
            name: "to",
          },
        ],
        log.data,
        log.topics
      );

      // console.log(item);

      var MongoClient = require("mongodb").MongoClient;
      var url = "mongodb+srv://kinarkhelp:HCwbh2cUu6yCt3Sk@cluster0.3hpzivh.mongodb.net/?retryWrites=true&w=majority";

      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('start')
        var dbo = db;

        // var tokenItem = {
        //     token: item.from,
        //     name: '',
        //     symbol: ''
        // }
        // dbo.collection('tokens').insertOne(tokenItem, function(err, res) {

        // });

        // tokenItem = {
        //     token: item.to,
        //     name: '',
        //     symbol: ''
        // }
        // dbo.collection('tokens').insertOne(tokenItem, function(err, res) {

        // });

        var myobj = {
          token1: item.from,
          token2: item.to,
          data: log.data,
          block_num: log.blockNumber,
          block_hash: log.blockHash,
        };

        dbo.collection("pairs").insertOne(myobj, function (err, res) {
          if (err) throw err;
          console.log("Number of documents inserted: " + res.insertedCount);
          // db.close();
        });
      });
    })
    .on("changed", function (log) {});
});
