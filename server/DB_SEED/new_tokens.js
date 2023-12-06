/* eslint-disable no-loop-func */
const ethers = require('ethers');
var async = require("async");

const provider = new ethers.providers.WebSocketProvider('wss://bsc-ws-node.nariox.org:443');

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
MongoClient.connect(url, async function (err, db) {
    if (err) throw err;

    var dbo = db.db("poocoin");
    dbo.collection("lpaddresses").createIndex({ "lp_address": 1 }, { unique: true });
    dbo.collection("tokens").createIndex({ "token": 1 }, { unique: true });
    var count_temp = await dbo.collection("lpaddresses").countDocuments();
    async.forever(
        function (StartSync) {
            factoryContract.allPairsLength().then(async (count) => {
                if (count > count_temp) {
                    for (var i = count_temp; i < count; i++) {
                        try {
                            await factoryContract.allPairs(i).then(async (pairAddress) => {
                                const pairContract = new ethers.Contract(pairAddress, abi, provider);

                                let token0 = await pairContract.token0();
                                const token0Contract = new ethers.Contract(token0, abi, provider);
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
                                    console.log(e);
                                }
                                let token1 = await pairContract.token1();

                                const token1Contract = new ethers.Contract(token1, abi, provider);
                                let token1Symbol = await token1Contract.symbol();
                                let token1name = await token1Contract.name();

                                record.name = token1name;
                                record.symbol = token1Symbol;
                                record.token = token1;

                                try {
                                    await dbo.collection("tokens").insertOne(record, function (err, res) {
                                        if (err) console.log(err);
                                        console.log("Number of documents inserted: " + i);
                                        // db.close();
                                    });
                                } catch (e) {
                                    console.log(e);
                                }

                                let lprecord = {}

                                lprecord.token0 = token0;
                                lprecord.token1 = token1;
                                lprecord.type = "PancakeSwap";
                                lprecord.lp_address = pairAddress;

                                try {
                                    await dbo.collection("lpaddresses").insertOne(lprecord, function (err, res) {
                                        if (err) console.log(err);
                                        console.log("Number of documents inserted: " + i);
                                        // db.close();
                                    });
                                } catch (e) {
                                    console.log(e);
                                }
                            });
                        } catch (error) {
                            console.log('-----')
                        }
                    }
                    count_temp = count;
                } else {
                    console.log('current lp is up to date')
                }
                StartSync()
            });
        },
        function (error) {
            console.log(error);
            StartSync()
        }
    );
});