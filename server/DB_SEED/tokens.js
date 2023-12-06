/* eslint-disable no-loop-func */
let mongoose = require('mongoose');
const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org');
const abi = [
    // all pairs Factory v2
    "function allPairsLength() view returns (uint256)",
    "function allPairs(uint256) view returns (address)",

    // token 0
    "function token0() view returns (address)",
    //token 1
    "function token1() view returns (address)",

    // symbol and name of token
    "function symbol() view returns (string)",
    "function name() view returns (string)",
];

const factoryAddress = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
const factoryContract = new ethers.Contract(factoryAddress, abi, provider);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://kinarkhelp:HCwbh2cUu6yCt3Sk@cluster0.3hpzivh.mongodb.net/?retryWrites=true&w=majority";

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(url, function (err, db) {
    if (err) throw err;
    console.log('kk')
    console.log(db)
    var dbo = db;
    dbo.collection("tokens").createIndex({ "token": 1 }, { unique: true });

    factoryContract.allPairsLength().then(count => {
        setTimeout(async () => {

            for (var i = 0; i < count; i++) {
                await factoryContract.allPairs(i).then(pairAddress => {
                    setTimeout(async () => {
                        const pairContract = new ethers.Contract(pairAddress, abi, provider);
                        let token0 = await pairContract.token0();
                        // let token0 = await pairContract.token1();

                        const token0Contract = new ethers.Contract(token0, abi, provider);
                        console.log(pairContract);
                        let token0Symbol = await token0Contract.symbol();
                        let token0name = await token0Contract.name();
                        let record = {};

                        record.name = token0name;
                        record.symbol = token0Symbol;
                        record.token = token0;

                        try {
                            await dbo.collection("tokens").insertOne(record, function (err, res) {
                                if (err) console.log(err);
                                console.log("Number of documents inserted: " + i);
                                // db.close();
                            });
                        } catch (e) {
                            console.log('failed');
                        }

                        // let token1 = await pairContract.token1();
                        // const token1Contract = new ethers.Contract(token1, abi, provider);
                        // let token1Symbol = await token1Contract.symbol();
                        // let token1name = await token1Contract.name();

                        // record.name = token1name;
                        // record.symbol = token1Symbol;
                        // record.token = token1;

                    }, 1);
                });
            }
        }, 1);
    });
});