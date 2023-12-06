/* eslint-disable import/first */
/* eslint-disable no-loop-func */
const ethers = require("ethers");
const Web3 = require("web3");

const abiDecoder = require("abi-decoder");
const logDecodeABI = [
  {
    inputs: [{ type: "address", name: "" }],
    constant: true,
    name: "isInstantiation",
    payable: false,
    outputs: [{ type: "bool", name: "" }],
    type: "function",
  },
  {
    inputs: [
      { type: "address[]", name: "_owners" },
      { type: "uint256", name: "_required" },
      { type: "uint256", name: "_dailyLimit" },
    ],
    constant: false,
    name: "create",
    payable: false,
    outputs: [{ type: "address", name: "wallet" }],
    type: "function",
  },
  {
    inputs: [
      { type: "address", name: "" },
      { type: "uint256", name: "" },
    ],
    constant: true,
    name: "instantiations",
    payable: false,
    outputs: [{ type: "address", name: "" }],
    type: "function",
  },
  {
    inputs: [{ type: "address", name: "creator" }],
    constant: true,
    name: "getInstantiationCount",
    payable: false,
    outputs: [{ type: "uint256", name: "" }],
    type: "function",
  },
  {
    inputs: [
      { indexed: false, type: "address", name: "sender" },
      { indexed: false, type: "address", name: "instantiation" },
    ],
    type: "event",
    name: "ContractInstantiation",
    anonymous: false,
  },
];
abiDecoder.addABI(logDecodeABI);
const topHolderAddress = "0x1ecd8ed7ffd03f38863f3b86ef3b9807a1999ff8";
const profileAddress = "0xba90d15d6384e8223bb4d96fe9efb0f06194fb39";
const unvettedAddress = "0x3a05d30f7428fe2333fb23afa9a2bf2dc012316b";
const poocoinAddress = "0xb27adaffb9fea1801459a1a81b17218288c097cc";
const myAccount = "0x50796F695484b29ba8b14881a516428FA7A58581";
const getLogsAddress = "0xca143ce32fe78f1f7019d7d551a6402fc5350c73";
const topics =
  "0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9";
const tokenAddress = "0xCe5814eFfF15D53EFd8025B9F2006D4d7D640b9B";
// pancakeswap v2 router addresss
const pancakeswap_router = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

// const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org");
const provider = new ethers.providers.WebSocketProvider(
  "wss://bsc-ws-node.nariox.org:443"
);
var web3 = new Web3(new Web3.providers.WebsocketProvider("wss://bsc-ws-node.nariox.org:443"));

const abi = [
  "function holderInfo(uint256, uint256) public view returns (address, uint256)",
  "function topHolderSize() public view returns (uint256)",
  "function userInfo(address) public view returns (string, address, string)",

  // symbol and name of token
  "function symbol() public pure returns (string)",
  "function name() public pure returns (string)",

  //get balance
  "function balanceOf(address) public view returns (uint256)",

  // get amount out
  "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",

  // swap
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
  "function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn)",
  "function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut)",

  // totalSupply
  "function totalSupply() public view returns (uint256)",
  //get reserve
  "function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) ",
];

const unvettedAbi = [
  "function messages(uint256) public view returns (address, string)",
  "function messageLength() public view returns (uint256)",
];

const getTotalSupply_contract = new ethers.Contract(
  tokenAddress,
  abi,
  provider
);
const contract = new ethers.Contract(topHolderAddress, abi, provider);
const profile_contract = new ethers.Contract(profileAddress, abi, provider);
const unvetted_contract = new ethers.Contract(
  unvettedAddress,
  unvettedAbi,
  provider
);
const poocoint_contract = new ethers.Contract(poocoinAddress, abi, provider);
const getAmountsOut_contract = new ethers.Contract(
  pancakeswap_router,
  abi,
  provider
);

// get pair
const getRate = async (tokenIn, tokenOut, setRate) => {
  await getAmountsOut_contract
    .getAmountsOut(ethers.utils.parseUnits("1", 18), [tokenIn, tokenOut])
    .then((res) => {
      setRate(parseInt(res[1]) / 1000000000000000000);
    });
};

//get total supply
const getTotalSupply = async (setTotalSupply) => {
  let temp = {};
  await getTotalSupply_contract.totalSupply().then((tSupply) => {
    let totalSupply = tSupply;
    temp.totalSupply = web3.utils.toBN(totalSupply).toString();
    // console.log(temp);
    setTotalSupply(temp);
  });
};

//get reserve
const getReserve = async (lpAddress, setReserve) => {
  const getReserves_contract = new ethers.Contract(lpAddress, abi, provider);
  await getReserves_contract.getReserves().then((res) => {
    console.log(res);
  });
};

// async function getPriceBySymbol(symbol) {

//   await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`)
//     .then(res => res.json())
//     .then(data => {
//       // console.log(data.thoreum.usd);
//       return data.symbol.usd;
//     })
//     .catch(err => {

//     })
// }

const vettedValues = async (setVettedData) => {
  let results = [];
  try {
    await contract.topHolderSize().then((count) => {
      for (var i = 0; i < parseInt(count); i++) {
        let item = {};
        contract.holderInfo(0, i).then((address) => {
          profile_contract.userInfo(address[0]).then((res) => {
            // item.price = getPriceBySymbol(res[0]);
            item.name = res[0];
            item.address = address[0];
            item.linkAddress = res[1]; // token address, symbol address
            item.amount = parseInt(address[1]) / 1000000000000000000;

            if (res[0] !== "") results.push(item);
          });
        });
      }

      setTimeout(() => {
        results.sort((a, b) => {
          let keyA = a.amount;
          let keyB = b.amount;
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        console.log(results);
        setVettedData(results);
      }, 8000);
    });
  } catch (e) {
    console.log(e);
  }
};

const unvettedValues = async (setUnvettedData) => {
  let unvettedArray = [];
  unvetted_contract.messageLength().then((count) => {
    for (var i = parseInt(count) - 1; i > parseInt(count) - 11; i--) {
      unvetted_contract.messages(i).then((address) => {
        unvettedArray.push(address);
      });
    }

    setTimeout(() => {
      setUnvettedData(unvettedArray);
    }, 8000);
  });
};

const poocoinBalance = async (account, setPoocoinBalanceData) => {
  if (account == null) account = myAccount;
  poocoint_contract.balanceOf(account).then((balance) => {
    setPoocoinBalanceData(parseInt(balance));
  });
};

let fromBlock = 0;
let apeArray = [];

const apeLists = async (setApeLists) => {
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

        if (item.from !== "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c") {
          // WBNB
          let temp = {};
          temp.from = item.from;
          temp.to = item.to;

          const symbol_contract = new ethers.Contract(item.from, abi, provider);
          symbol_contract.symbol().then((symbol) => {
            temp.symbol = symbol;
            symbol_contract.name().then((name) => {
              temp.name = name;
            });
          });

          apeArray.push(temp);
        }
      })
      .on("changed", function (log) { });

    setTimeout(() => {
      setApeLists(apeArray.reverse());
    }, 8000);
  });
};

const daiAbi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "_decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "mint",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const token_address = "0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3"; // Safemoon token

const ownerAbi = [
  "function owner() public view returns (address)",
  "function totalSupply() public view returns (uint256)",
];

const myContract = new web3.eth.Contract(daiAbi, token_address);
const ownerContract = new ethers.Contract(token_address, ownerAbi, provider);

const devActivity = async (setDevActivityData) => {
  ownerContract.owner().then((res) => {
    let wallet_address = res;

    web3.eth.getBlockNumber().then((blockNumber) => {
      let options = {
        filter: {
          value: [],
        },
        fromBlock: 9876000,
        toBlock: 9881000,
      };

      let transfers = [];

      myContract
        .getPastEvents("Transfer", options)
        .then((results) => {
          for (var i = 0; i < results.length; i++) {
            if (wallet_address === results[i].returnValues.from) {
              var myobj = {
                from: results[i].address, // token Address
                from_address: results[i].returnValues.from,
                to: results[i].returnValues.to,
                amount: results[i].returnValues.value,
                block_number: results[i].blockNumber,
                tx: results[i].transactionHash,
                // symbol: ''
              };

              // const symbol_contract = new ethers.Contract(results[i].address, abi, provider);
              // symbol_contract.symbol().then(symbol => {
              //   myobj.symbol = symbol;

              // })

              transfers.push(myobj);
            }
          }

          // setTimeout(() => {
          setDevActivityData(transfers);
          // }, 8000)
        })
        .catch((err) => console.log(err));
    });
  });
};

const totalSupply = async (setTotalSupplyData) => {
  let temp = {};

  ownerContract.owner().then((res) => {
    let owner_address = res;
    temp.owner = owner_address;

    ownerContract.totalSupply().then((tSupply) => {
      let totalSupply = tSupply;

      temp.totalSupply = web3.utils.toBN(totalSupply).toString();

      // console.log(temp);
      setTotalSupplyData(temp);
    });
  });
};

const tokenBalance = async (
  wallet_address,
  token_address,
  setTokenBalanceData
) => {
  let balance_contract = new ethers.Contract(token_address, abi, provider);
  balance_contract.balanceOf(wallet_address).then((balance) => {
    setTokenBalanceData((parseInt(balance) / 1000000000000000000).toFixed(4));
  });
};

const bnbBalance = async (wallet_address, setBnbBalanceData) => {

  web3.eth.getBalance(wallet_address).then(balance => {
    setBnbBalanceData((parseInt(balance)/1000000000000000000).toFixed(7));
  })
}

const tokenSwap = async (provider, routerAbi, amount, tokenIn, tokenOut, account, slippage, callback) => {
  try {
    // metamask
    var mweb3 = new Web3(provider);
    var contract = new mweb3.eth.Contract(routerAbi, pancakeswap_router);
    contract.setProvider(provider);

    if (tokenIn == "0x0000000000000000000000000000000000000000") { // BNB 
      var amountOut = contract.methods.getAmountsOut(ethers.utils.parseUnits(amount, 'ether'), [tokenIn, tokenOut]);
      var tx = await contract.methods.swapExactETHForTokens(amountIn, 0, [tokenIn, tokenOut], account, Date.now() + 1000 * 60 * 10)
        .send({
            from: account
        });
    } else {
      var amountIn = ethers.utils.parseUnits(amount, 'ether');
      var tx = await contract.methods.swapExactTokensForTokens(amountIn, 0, [tokenIn, tokenOut], account, Date.now() + 1000 * 60 * 10)
        .send({
            from: account
        });
    }
    
    console.log(tx);
    callback(tx);
  } catch (err) {
      console.log(err);
  }
}

module.exports = { vettedValues, unvettedValues, poocoinBalance, apeLists, devActivity, totalSupply, tokenBalance, bnbBalance, getRate, tokenSwap };