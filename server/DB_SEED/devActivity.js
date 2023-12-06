/* eslint-disable no-loop-func */
const Web3 = require("web3");
let mongoose = require('mongoose');
const ethers = require('ethers');
var web3 = new Web3(
    new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org")
  );
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://kinarkhelp:HCwbh2cUu6yCt3Sk@cluster0.3hpzivh.mongodb.net/?retryWrites=true&w=majority";

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(url, function (err, db) {
    if (err) throw err;
    console.log('kk')
    console.log(db)
    var dbo = db;

    // Transfer event
    const daiAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    // const contract_address = "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3"; // DAI token
    const contract_address = "0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3"; // Safemoon token
    const wallet_address = "0x79c4Af7c43F500b9cCBa9396d079cC03DFcAFdA1";

    const myContract = new web3.eth.Contract(daiAbi, contract_address);

    web3.eth.getBlockNumber()
    .then(blockNumber => {
    
        let latest_block_number = blockNumber;
        let to_block = 4500;
        let from_block = 0;

        // for(to_block = 4500; to_block < latest_block_number + 4500; to_block = to_block+4500, from_block = from_block + 4501) {

            let options = {
                filter: {
                    value: []
                },
                fromBlock: 9880000,
                toBlock: 9881000
            };

            let transfers = [];

            // setTimeout(async () => {
            // // if(to_block < latest_block_number + 4500) {
                myContract.getPastEvents('Transfer', options)
                .then(results => {

                    // console.log(results[0]);
                    // console.log(results[0].raw.topics);

                    for(var i = 0; i < results.length; i++) {

                        if(wallet_address === results[i].returnValues.from) {
                            var myobj = {
                                token_address: results[i].address,
                                from: results[i].returnValues.from,
                                to: results[i].returnValues.to,
                                amount: results[i].returnValues.value,
                                block_number: results[i].blockNumber
                            };

                            console.log("insert count : " + i);
                            transfers.push(myobj);
                        }
                    }
                    dbo.collection("transfers").insertMany(transfers, function(err, res) {
                        if (err) throw err;
                            console.log("Number of documents inserted: " + res.insertedCount);
                            // db.close();
                    });
                    

                    // console.log("from : " + from_block);
                    // from_block = from_block + 4500 + 1;
                    // to_block = to_block + 4500;
                })
                .catch(err => console.log(err));
            // }
                
            // }, 1);
            // let count = 0;
            // web3.eth.subscribe('logs', {
            //     fromBlock: 10150899,
            //     toBlock: 'latest',
            //     topics: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"] // transfer
            // }, function(error, result){
            //     //   if (!error)
            //     //       console.log(result);
            // })
            // .on("connected", function(subscriptionId){
            //     // console.log("subcriptionID === " + subscriptionId);
            // })
            // .on("data", function(log){
            //     // console.log(log);

            //     // if(log.topics.length === 3) {
            //     //     let item = web3.eth.abi.decodeLog(
            //     //         [{
            //     //             type: 'string',
            //     //             name: 'topicsAddress',
            //     //             indexed: true
            //     //         },{
            //     //             type: 'address',
            //     //             name: 'from',
            //     //             indexed: true
            //     //         },{
            //     //             type: 'address',
            //     //             name: 'to',
            //     //             indexed: true
            //     //         }],
            //     //         log.data,
            //     //         log.topics
            //     //     );

            //     //     // console.log(item.from);
            //     //     // console.log(item.to);

                    

            //     //     let transfer = {};
            //     //     transfer.address = log.address;
            //     //     transfer.data = log.data;
            //     //     transfer.from = item.from;
            //     //     transfer.to = item.to;
            //     //     transfer.block_number = log.blockNumber;
            //     //     transfer.amount = web3.utils.toBN(log.data).toString();
            //     //     transfer.transaction_hash = log.transactionHash;
            //     //     transfer.transaction_index = log.transactionIndex;
            //     //     transfer.block_hash = log.blockHash;
            //     //     transfer.log_index = log.logIndex;
            //     //     transfer.removed = log.removed;
            //     //     transfer.id = log.id;

            //     //     dbo.collection("transfers").insertOne(transfer, function(err, res) {
            //     //         if (err) throw err;
            //     //             console.log("Number of documents inserted: " + res.insertedCount);
            //     //             // db.close();
            //     //     });
            //     // }

            //     count++;
            //     console.log(log.blockNumber);
            //     console.log(count);
                
            //     // apeArray.push(temp);
            // })
            // .on("changed", function(log){
            // });

            // var filter = {
            //     fromBlock: 10150899,
            //     toBlock: 10150999
            // };
            // var callPromise = provider.getLogs(filter);
            // callPromise.then(function(events) {
            //     console.log("Printing array of events:");
            //     console.log(events);
            // }).catch(function(err){
            //     console.log(err);
            // });
        // }
    });
});  