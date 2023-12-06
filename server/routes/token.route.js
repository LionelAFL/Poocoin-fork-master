/* eslint-disable no-loop-func */
let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// token Model
let tokenSchema = require("../models/Token");
let lpSchema = require("../models/Lpaddresses");

// router.route("/getTokenName").get(async (req, res) => {
//   // console.log("zzzzzzzzzzz");
//   console.log(req.query.foo);
//   let tokenName = await tokenSchema.find({
//     name: { $regex: req.body, $options: "i" },
//     // name: "EOS Token",
//   });
//   // console.timeEnd("aa");dddddddddddddddddddd
//   console.log(tokenName);
//   res.json(tokenName);
// });

//search token information from token name and address
router.get("/getTokenName", async (req, res) => {
  try {
    let query = req.query.foo;
    let tokenInfo;
    if (query.length > 1) {
      if (query.substring(0, 2) == '0x') {
        tokenInfo = await tokenSchema
          .find({
            token: { $regex: query, $options: "i" },
          })
          .collation({ locale: "en", strength: 2 })
          .limit(50);
        res.json(tokenInfo);
      } else {
        tokenInfo = await tokenSchema
          .find({
            name: { $regex: query, $options: "i" },
          })
          .collation({ locale: "en", strength: 2 })
          .limit(50);
        res.json(tokenInfo);
      }
    }
    console.log('worked')
  } catch (err) {
    console.log(err);
  }
});

//Get tokenName from current token address
router.get("/getSymbol", async (req, res) => {
  try {
    let query = req.query.tokenAddress;
    let symbolName;
    if (query.length > 1) {
      symbolName = await tokenSchema
        .find({
          token: { $regex: query, $options: "i" },
        })
        .collation({ locale: "en", strength: 2 })
        .select("symbol")
        .limit(50);
      res.json(symbolName);
      // console.log(tokenName);
    }
  } catch (err) {
    // res.json(err);
  }
});

router.get("/getTokenProps", async (req, res) => {
  try {
    let token_address = req.query.foo;
    tokenProps = lpSchema.find({
      $and: [
        { $or: [{ token0: token_address }, { token1: token_address }] },
        {
          $or: [
            { token0: "0x2170ed0880ac9a755fd29b2688956bd959f933f8" },
            { token0: "0xe9e7cea3dedca5984780bafc599bd69add087d56" },
            { token0: "0x55d398326f99059ff775485246999027b3197955" },
            { token0: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" },
            { token0: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c" },
            { token1: "0x2170ed0880ac9a755fd29b2688956bd959f933f8" },
            { token1: "0xe9e7cea3dedca5984780bafc599bd69add087d56" },
            { token1: "0x55d398326f99059ff775485246999027b3197955" },
            { token1: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" },
            { token1: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c" },
          ],
        },
      ],
    }).collation({ locale: "en", strength: 2 });
    res.json(tokenProps);
  } catch (err) { }
});

//Get all info about current token from lpaddress and token table
router.get("/getLpinfo", async (req, res) => {
  try {
    let token_address = req.query.foo;
    let lpInfos = await lpSchema.find({
      $or: [
        {
          $and: [
            { token0: token_address },
            {
              $or: [
                { token1: "0x2170ed0880ac9a755fd29b2688956bd959f933f8" },
                { token1: "0xe9e7cea3dedca5984780bafc599bd69add087d56" },
                { token1: "0x55d398326f99059ff775485246999027b3197955" },
                { token1: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" },
                { token1: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c" },
              ]
            }
          ]
        },
        {
          $and: [
            { token1: token_address },
            {
              $or: [
                { token0: "0x2170ed0880ac9a755fd29b2688956bd959f933f8" },
                { token0: "0xe9e7cea3dedca5984780bafc599bd69add087d56" },
                { token0: "0x55d398326f99059ff775485246999027b3197955" },
                { token0: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" },
                { token0: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c" },
              ]
            }
          ]
        }
      ]
      // $and: [
      //   { $or: [{ token0: token_address }, { token1: token_address }] },
      //   {
      //     $or: [
      //       { token0: "0x2170ed0880ac9a755fd29b2688956bd959f933f8" },
      //       { token0: "0xe9e7cea3dedca5984780bafc599bd69add087d56" },
      //       { token0: "0x55d398326f99059ff775485246999027b3197955" },
      //       { token0: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" },
      //       { token0: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c" },
      //       { token1: "0x2170ed0880ac9a755fd29b2688956bd959f933f8" },
      //       { token1: "0xe9e7cea3dedca5984780bafc599bd69add087d56" },
      //       { token1: "0x55d398326f99059ff775485246999027b3197955" },
      //       { token1: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" },
      //       { token1: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c" },
      //     ],
      //   },
      // ],
    }).collation({ locale: "en", strength: 2 });

    tokenName = await tokenSchema
      .findOne({
        token: token_address,
      }).collation({ locale: "en", strength: 2 });
    //token selected info
    let tokenInfo = { name: tokenName.name, symbol: tokenName.symbol, address: tokenName.token };
    let ret_arr = [];

    for (let index = 0; index < lpInfos.length; index++) {
      tokenName0 = await tokenSchema
        .find({
          token: lpInfos[index].token0,
        }).collation({ locale: "en", strength: 2 });
      tokenName1 = await tokenSchema
        .find({
          token: lpInfos[index].token1,
        }).collation({ locale: "en", strength: 2 });
      if (tokenName0.length == 0 || tokenName1.length == 0) {
        continue;
      }
      //token0, token1 infos
      const item = {
        token0: lpInfos[index].token0,
        token1: lpInfos[index].token1,
        lp_address: lpInfos[index].lp_address,
        type: lpInfos[index].type,
        tokenName0: tokenName0[0].name,
        tokenName1: tokenName1[0].name,
        tokenSymbol0: tokenName0[0].symbol,
        tokenSymbol1: tokenName1[0].symbol,
      }
      ret_arr.push(item);
    }
    res.json({ lpInfos: ret_arr, tokenInfos: tokenInfo });
  } catch (err) {
    res.json({ lpInfos: null, tokenInfos: null });
    console.log(err);
  }
});

//Get Lpaddress from current token address and BNB token address
router.get("/getLpaddress", async (req, res) => {
  try {
    let tokenAddress = req.query.tokenAddress;
    let coinAddress = req.query.coinAddress;
    let lpaddress;
    if (tokenAddress != null) {
      lpaddress = await lpSchema.findOne({
        $or: [
          { $and: [{ token0: tokenAddress }, { token1: coinAddress }] },
          { $and: [{ token1: tokenAddress }, { token0: coinAddress }] },
        ],
      }).collation({ locale: "en", strength: 2 });
      res.json(lpaddress.lp_address);
    }
  } catch (err) {
    console.log(err);
    // res.json(err);
  }
})

// router.route("/postTokenURL").post((req, res, next) => {
//   if (error) {
//     return next(error);
//   } else {
//     console.log(data);
//     res.json(data);
//   }
// });

router.route("/getToken/:values").get(async (req, res) => {
  let data = JSON.parse(req.params.values);
  let results = [];

  for (var i = 0; i < data.values.length; i++) {
    let token = await tokenSchema
      .findOne({ token: data.values[i].from })
      .collation({ locale: "en", strength: 2 });

    let temp = {};
    if (token !== null) {
      temp.name = token.name;
      temp.symbol = token.symbol;
    } else {
      temp.name = data.values[i].from;
      // temp.symbol = data.values[i].to;
    }

    temp.from = data.values[i].from;
    temp.to = data.values[i].to;

    results.push(temp);
  }
  res.json(results);
});

router.route("/getTokenDevActivity/:values").get(async (req, res) => {
  let data = JSON.parse(req.params.values);
  let results = [];

  for (var i = 0; i < data.values.length; i++) {
    let token = await tokenSchema
      .findOne({ token: data.values[i].from })
      .collation({ locale: "en", strength: 2 });

    let temp = {};
    if (token !== null) {
      temp.name = token.name;
      temp.symbol = token.symbol;
    } else {
      temp.name = data.values[i].from;
      temp.symbol = data.values[i].to;
    }

    temp.from = data.values[i].from;
    temp.to = data.values[i].to;
    temp.from_address = data.values[i].from_address;
    temp.amount = data.values[i].amount;
    temp.block_number = data.values[i].block_number;
    temp.tx = data.values[i].tx;

    results.push(temp);
  }
  res.json(results);
});

// // Get Single token
// router.route('/getToken/:from').get((req, res) => {
//   tokenSchema.find({token: req.params.from}, (error, data) => {

//     console.log(req.params.from);
//     console.log(data);

//     if (error) {
//     //   return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })

// // Update token
// router.route('/update-token/:id').put((req, res, next) => {
//   tokenSchema.findByIdAndUpdate(req.params.id, {
//     $set: req.body
//   }, (error, data) => {
//     if (error) {
//       return next(error);
//       console.log(error)
//     } else {
//       res.json(data)
//       console.log('token updated successfully !')
//     }
//   })
// })

// // Delete token
// router.route('/delete-token/:id').delete((req, res, next) => {
//   tokenSchema.findByIdAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data
//       })
//     }
//   })
// })

module.exports = router;
