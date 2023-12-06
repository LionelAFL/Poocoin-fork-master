/* eslint-disable no-loop-func */
let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

// token Model
let addressSchema = require("../models/Lpaddresses");

router.get("/getaddres/:values", async (req, res) => {
    try {
        let data = JSON.parse(req.params.values);
        let tokenName;
        if (query.length > 1) {
            tokenName = await addressSchema.find({
                name: { $regex: query, $options: "i" },
            });
            res.json(tokenName);
        }

    } catch (err) {
        // res.json(err);
    }
});

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
            .findOne({ token: data.values[i].from.toLowerCase() })
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
            .findOne({ token: data.values[i].from.toLowerCase() })
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
