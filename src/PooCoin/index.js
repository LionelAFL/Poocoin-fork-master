/* eslint-disable import/first */
/* eslint-disable no-loop-func */
const ethers = require("ethers");
const Web3 = require("web3");
const BigNumber = require("bignumber.js");
import erc20_abi from '../config/abi/erc20.json';
import router_abi from '../config/abi/router.json';
import { getOwnToken, getPriceByTime, getTransactionListData } from './bitquery';
import DefaultTokens from '../config/default_tokens.json';
import vetted from '../config/vetted.json';
import unvetted from '../config/unvetted.json';
import { numberWithCommas } from './util';

const topHolderAddress = "0xf58Ea23d113cEFBD25051c8A780aa9123EceC950";
const profileAddress = "0xf58Ea23d113cEFBD25051c8A780aa9123EceC950";
const unvettedAddress = "0x3a05d30f7428fe2333fb23afa9a2bf2dc012316b";
const getLogsAddress = "0xca143ce32fe78f1f7019d7d551a6402fc5350c73";
const topics =
  "0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9";
// pancakeswap v2 router addresss

const poocoinAddress = "0x0b792D96187262b9256F1ace7Bc964E888917C45";
const myAccount = "0xf58Ea23d113cEFBD25051c8A780aa9123EceC950";
const pancakeswap_router = "0x1be0A92470c4e3844Dae47F573381b3B088Aa69d";

const provider = new ethers.providers.JsonRpcProvider("https://mainnet-rpc.prmscan.org");
// const provider = new ethers.providers.WebSocketProvider(
//   "wss://bsc-ws-node.nariox.org:443"
// );
// var web3 = new Web3(
//   new Web3.providers.WebsocketProvider("wss://bsc-ws-node.nariox.org:443")
// );
var web3 = new Web3(
  new Web3.providers.HttpProvider("https://mainnet-rpc.prmscan.org")
);

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

const contract = new ethers.Contract(topHolderAddress, abi, provider);
const profile_contract = new ethers.Contract(profileAddress, abi, provider);
const unvetted_contract = new ethers.Contract(
  unvettedAddress,
  unvettedAbi,
  provider
);
const poocoint_contract = new ethers.Contract(poocoinAddress, abi, provider);

const pancakeRouterContract = new ethers.Contract(pancakeswap_router, abi, provider);
// get pair
export const getRate = async (tokenIn, tokenOut, setRate) => {
  try {

    await pancakeRouterContract
      .getAmountsOut(ethers.utils.parseUnits("1", 18), [tokenIn, tokenOut])
      .then((res) => {
        setRate(parseInt(res[1]) / 1000000000000000000);
      }).catch((err) => {
        console.log(err);
      })
  } catch (err) {
    console.log(err);
  }
}

const pancakeswapRouterContract = new web3.eth.Contract(router_abi, pancakeswap_router);
// get Amount out
export const getAmountsOut = async (amount, tokenIn, tokenOut, updateAmountsOut) => {
  try {
    if (tokenIn === DefaultTokens.PRM.address) {
      tokenIn = DefaultTokens.WPRM.address;
    }

    if (tokenOut === DefaultTokens.PRM.address) {
      tokenOut = DefaultTokens.WPRM.address;
    }
    const tokenInContract = new web3.eth.Contract(erc20_abi, tokenIn);
    const tokenIn_decimals = await tokenInContract.methods.decimals().call();
    const tokenOutContract = new web3.eth.Contract(erc20_abi, tokenOut);
    const tokenOut_decimals = await tokenOutContract.methods.decimals().call();

    const amount_in = toBigNum(amount, tokenIn_decimals);
    pancakeswapRouterContract.methods
      .getAmountsOut(amount_in, [tokenIn, tokenOut])
      .call().then((result) => {
        const amount_out = toHuman(result[1], tokenOut_decimals);
        updateAmountsOut(amount_out, true);
      }).catch((err) => {
        console.log(err);       
      })
  } catch (err) {
    console.log(err)
  }
};

export const getAmountsOutChart = async (amount, tokenIn, tokenOut) => {
  try {
    if (tokenIn === DefaultTokens.PRM.address) {
      tokenIn = DefaultTokens.WPRM.address;
    }

    if (tokenOut === DefaultTokens.PRM.address) {
      tokenOut = DefaultTokens.WPRM.address;
    }
    const tokenInContract = new web3.eth.Contract(erc20_abi, tokenIn);
    const tokenIn_decimals = await tokenInContract.methods.decimals().call();
    const tokenOutContract = new web3.eth.Contract(erc20_abi, tokenOut);
    const tokenOut_decimals = await tokenOutContract.methods.decimals().call();

    const amount_in = toBigNum(amount, tokenIn_decimals);
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pancakeswapRouterContract.methods
          .getAmountsOut(amount_in, [tokenIn, tokenOut])
          .call();

        const amount_out = toHuman(result[1], tokenOut_decimals);

        // Resolve the Promise with the amount_out value
        resolve(amount_out);
      } catch (err) {
        console.log(err);
        reject(err); // Reject the Promise in case of an error
      }
    });
  } catch (err) {
    console.log(err)
  }
};

//get total supply
export const getTotalSupply = async (tokenAddress) => {
  const getTotalSupply_contract = new ethers.Contract(
    tokenAddress,
    abi,
    provider
  );

  const decimals = await getDecimals(tokenAddress)

  const ts = await getTotalSupply_contract.totalSupply()
  let totalSupply = toHuman(ts, decimals);
  return totalSupply;
};

const getDecimals = (tokenAddress) => {
  let MyContract1 = new web3.eth.Contract(erc20_abi, tokenAddress);
  return MyContract1.methods.decimals().call()
}

//get reserve
export const getReserve = async (lpAddress, tokenNo) => {
  const getReserves_contract = new ethers.Contract(lpAddress, abi, provider);
  const reserves = await getReserves_contract.getReserves();
  if (tokenNo == 0) {
    let ret = web3.utils.fromWei(reserves[1].toString(), "ether");
    return ret.toString()
  } else {
    let ret = web3.utils.fromWei(reserves[0].toString(), "ether");
    return ret.toString()
  }
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

export const vettedValues = async (accountAddress, setVettedData) => {
  try {
    let results = vetted;
      for (var i = 0; i < results.length; i++) {
        const currencyAddress = results[i].address;
        if (currencyAddress != '-') {
          try {
            //own token contract
            const tokenIn_decimals = await getDecimals(currencyAddress)
            //BUSD token contract
            const tokenOut_decimals = await getDecimals(DefaultTokens.USDT.address)
  
            const amount_in = toBigNum(1, tokenIn_decimals);
            const amount_out = await pancakeswapRouterContract.methods
              .getAmountsOut(amount_in, [currencyAddress, DefaultTokens.USDT.address])
              .call();
            const tokenRate = toHuman(amount_out[1], tokenOut_decimals)
            results[i]['rate'] = tokenRate.toFixed(4);
              async function getAccountBalance() {
                try {
                  const contract = new web3.eth.Contract(erc20_abi, currencyAddress);
                  const decimals = await contract.methods.decimals().call({ from: accountAddress });
                  const balance = await contract.methods.balanceOf(accountAddress).call({ from: accountAddress });
                  // Convert the balance to human-readable format using the decimals
                  const tokenBalance = (toHuman(balance, decimals)).toFixed(4);
                  return tokenBalance
                } catch(err) {
                  return null;
                }
              }    
            const amt = await getAccountBalance();
            results[i]['rateAmount'] = (tokenRate * amt).toFixed(4);
            results[i]['value'] = amt;
          } catch (err) {
            async function getAccountBalance() {
              try {
                const contract = new web3.eth.Contract(erc20_abi, currencyAddress);
                const decimals = await contract.methods.decimals().call({ from: accountAddress });
                const balance = await contract.methods.balanceOf(accountAddress).call({ from: accountAddress });
                // Convert the balance to human-readable format using the decimals
                const tokenBalance = (toHuman(balance, decimals)).toFixed(4);
                return tokenBalance
              } catch(err) {
                return null;
              }
            }    
            const amt = await getAccountBalance();
            results[i]['value'] = amt;
            const tokenRate = 0;
            results[i]['rate'] = tokenRate.toFixed(4);
            results[i]['rateAmount'] = tokenRate.toFixed(4);
            continue;
          }
        }
      }
      setVettedData(results)
  } catch (e) {
    console.log(e);
  }
};

export const unvettedValues = async (accountAddress, setUnvettedData) => {
  try {
    let results = unvetted;
      for (var i = 0; i < results.length; i++) {
        const currencyAddress = results[i].address;
        if (currencyAddress != '-') {
          try {
            //own token contract
            const tokenIn_decimals = await getDecimals(currencyAddress)
            //BUSD token contract
            const tokenOut_decimals = await getDecimals(DefaultTokens.USDT.address)
  
            const amount_in = toBigNum(1, tokenIn_decimals);
            const amount_out = await pancakeswapRouterContract.methods
              .getAmountsOut(amount_in, [currencyAddress, DefaultTokens.USDT.address])
              .call();
            const tokenRate = toHuman(amount_out[1], tokenOut_decimals)
            results[i]['rate'] = tokenRate.toFixed(4);
              async function getAccountBalance() {
                try {
                  const contract = new web3.eth.Contract(erc20_abi, currencyAddress);
                  const decimals = await contract.methods.decimals().call({ from: accountAddress });
                  const balance = await contract.methods.balanceOf(accountAddress).call({ from: accountAddress });
                  // Convert the balance to human-readable format using the decimals
                  const tokenBalance = (toHuman(balance, decimals)).toFixed(4);
                  return tokenBalance
                } catch(err) {
                  return null;
                }
              }    
            const amt = await getAccountBalance();
            results[i]['rateAmount'] = (tokenRate * amt).toFixed(4);
            results[i]['value'] = amt;
          } catch (err) {
            async function getAccountBalance() {
              try {
                const contract = new web3.eth.Contract(erc20_abi, currencyAddress);
                const decimals = await contract.methods.decimals().call({ from: accountAddress });
                const balance = await contract.methods.balanceOf(accountAddress).call({ from: accountAddress });
                // Convert the balance to human-readable format using the decimals
                const tokenBalance = (toHuman(balance, decimals)).toFixed(4);
                return tokenBalance
              } catch(err) {
                return 0;
              }
            }    
            const amt = await getAccountBalance();
            results[i]['value'] = amt;
            const tokenRate = 0;
            results[i]['rate'] = tokenRate.toFixed(4);
            results[i]['rateAmount'] = tokenRate.toFixed(4);
            continue;
          }
        }
      }
      setUnvettedData(results)
  } catch (e) {
    console.log(e);
  }
};

export const poocoinBalance = async (account, setPoocoinBalanceData) => {
  if (account == null) account = myAccount;
  poocoint_contract.balanceOf(account).then((balance) => {
    const balanceInWei = parseInt(balance);
    const balanceInTokens = balanceInWei / 10 ** 9;
    setPoocoinBalanceData(balanceInTokens.toFixed(4));
  });
};

export const poocoinLpv1 = async (account, setLpBalanceData) => {
  let lpv1Address = '0x746a3f1a3863cf839bf0702c083cCA888AbA6EE8'
  const lpv1_contract = new ethers.Contract(lpv1Address, abi, provider);
  if (account == null) account = myAccount;
  lpv1_contract.balanceOf(account).then((balance) => {
    setLpBalanceData(parseInt(balance));
  });
};

export const poocoinLpv2 = async (account, setLpBalanceData) => {
  let lpv2Address = '0x0c5DA0f07962dd0256c079248633f2b43CaD6f62'
  const lpv2_contract = new ethers.Contract(lpv2Address, abi, provider);
  if (account == null) account = myAccount;
  lpv2_contract.balanceOf(account).then((balance) => {
    setLpBalanceData(parseInt(balance));
  });
};

let fromBlock = 0;
let apeArray = [];

export const apeLists = async (setApeLists) => {
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

export const devActivity = async (setDevActivityData) => {
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

export const tokenBalance = async (wallet_address, token_address, setTokenBalanceData) => {

  try {
    const contract = new web3.eth.Contract(erc20_abi, token_address);
    const decimals = await contract.methods.decimals().call({ from: wallet_address });
    contract.methods.balanceOf(wallet_address)
      .call({ from: wallet_address }).then((balance) => {
        setTokenBalanceData(toHuman(balance, decimals));
      }).catch((err) => {
        console.log(err);
      })
  } catch (err) {
    console.log(err);
  }
};

export const bnbBalance = (wallet_address, setBnbBalanceData) => {

  try {
    web3.eth.getBalance(wallet_address).then(balance => {
      setBnbBalanceData(web3.utils.fromWei(balance.toString(), "ether"));
    }).catch(err => {
      console.log(err);
    })
  } catch (e) {
    console.log(e);
  }

}

export const prxBalance = (wallet_address, token_address, setTokenBalanceData) => {

  try {
    const contract = new web3.eth.Contract(erc20_abi, DefaultTokens.PRX.address);
    const decimals = 18;
    contract.methods.balanceOf(wallet_address)
      .call({ from: wallet_address }).then((balance) => {
        setTokenBalanceData(toHuman(balance, decimals));
      }).catch((err) => {
        console.log(err);
      })
  } catch (err) {
    console.log(err);
  }

}

export const tokenSwap = async (ethereum, amount, tokenIn, tokenOut, account, miniumAmountOut, swapcallback) => {
  try {
    var mweb3 = new Web3(ethereum);
    var contract = new mweb3.eth.Contract(router_abi, pancakeswap_router);
    contract.setProvider(ethereum);

    if (tokenIn == DefaultTokens.PRM.address) {
      tokenIn = DefaultTokens.WPRM.address;
    }

    if (tokenOut == DefaultTokens.PRM.address) {
      tokenOut = DefaultTokens.WPRM.address;
    }

    const tokenInContract = new web3.eth.Contract(erc20_abi, tokenIn);
    const tokenIn_decimals = await tokenInContract.methods.decimals().call();
    const tokenOutContract = new web3.eth.Contract(erc20_abi, tokenOut);
    const tokenOut_decimals = await tokenOutContract.methods.decimals().call();

    const amount_in = toBigNum(amount, tokenIn_decimals);
    const amount_out = parseInt(toBigNum(miniumAmountOut, tokenOut_decimals)).toString();

    if (tokenIn == DefaultTokens.WPRM.address) {
      var tx = await contract.methods.swapExactETHForTokens(amount_out, [tokenIn, tokenOut], account, Date.now() + 1000 * 60 * 10)
        .send({
          from: account,
          value: amount_in
        });
    } else if (tokenOut == DefaultTokens.WPRM.address) {
      var tx = await contract.methods.swapExactTokensForETH(amount_in, amount_out, [tokenIn, tokenOut], account, Date.now() + 1000 * 60 * 10)
        .send({
          from: account
        });
    } else {
      var tx = await contract.methods.swapExactTokensForTokens(amount_in, amount_out, [tokenIn, tokenOut], account, Date.now() + 1000 * 60 * 10)
        .send({
          from: account
        });
    }
    swapcallback(tx);
  } catch (err) {
    console.log(err);
  }
}

export const getAllowance = (ethereum, account, token, updateAllowance) => {
  try {
    const mweb3 = new Web3(ethereum);
    const contract = new mweb3.eth.Contract(erc20_abi, token);
    contract.setProvider(ethereum);
    const decimals = 18;
    contract.methods.allowance(account, pancakeswap_router).call().then((allowance) => {
      updateAllowance(toHuman(allowance, decimals))
    });
  } catch (err) {
    console.log(err);
  }
}

export const approveToken = async (ethereum, token, amount, account) => {
  try {
    const mweb3 = new Web3(ethereum);
    const contract = new mweb3.eth.Contract(erc20_abi, token);
    contract.setProvider(ethereum);

    const tx = await contract.methods.approve(pancakeswap_router, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({
      from: account
    });

    return {
      hash: tx.blockHash,
      status: tx.status,
    }
  } catch (err) {
    return {
      status: false
    }
  }
}

const toHuman = (num, decimals) => {
  const humanNum = new BigNumber(num).div(new BigNumber(10).pow(new BigNumber(decimals)));
  return humanNum.toNumber();
}

const toBigNum = (num, decimals) => {
  return new BigNumber(num).times(new BigNumber(10).pow(new BigNumber(decimals)));
}

//tokens page transaction table - buyer
export const getBuyersData = async (tokenAddress, currentTimeInfo, previousTimeInfo, setBuyersValues) => {
  const currentDate = currentTimeInfo.year + "-" + currentTimeInfo.fullmonth + "-" + currentTimeInfo.day + "T" + currentTimeInfo.fullhour + ":" + currentTimeInfo.minute + ":00.000Z"

  const previousDate = previousTimeInfo.year + "-" + previousTimeInfo.fullmonth + "-" + previousTimeInfo.day + "T" + previousTimeInfo.fullhour + ":" + previousTimeInfo.minute + ":00.000Z"
  fetch(`/api1/top-trades?address=${tokenAddress}&from=${previousDate}&to=${currentDate}&type=buy`)
    .then(res => res.json())
    .then(res => {
      setBuyersValues(res)
    });
}

export const getSellersData = async (tokenAddress, currentTimeInfo, previousTimeInfo, setSellersValues) => {
  const currentDate = currentTimeInfo.year + "-" + currentTimeInfo.fullmonth + "-" + currentTimeInfo.day + "T" + currentTimeInfo.fullhour + ":" + currentTimeInfo.minute + ":00.000Z"

  const previousDate = previousTimeInfo.year + "-" + previousTimeInfo.fullmonth + "-" + previousTimeInfo.day + "T" + previousTimeInfo.fullhour + ":" + previousTimeInfo.minute + ":00.000Z"
  fetch(`/api1/top-trades?address=${tokenAddress}&from=${previousDate}&to=${currentDate}&type=sell`)
    .then(res => res.json())
    .then(res => {
      setSellersValues(res)
    });
}

export const getWalletData = async (tokenAddress, account, setWalletValues) => {
  // await fetch(`https://api1.poocoin.app/wallet-tx?address=${tokenAddress}&wallet=${account}`)
  //   .then(res => res.json())
  //   .then(data => { setWalletValues(data) })
  //   .catch(err => console.log(err))
  const data = await fetch(`/api1/wallet-tx?address=0x580dE58c1BD593A43DaDcF0A739d504621817c05&wallet=0x1660cd15544fdf176677079a0675c8c59f020e84`)
    .then(res => res.json())
    .then(data => { setWalletValues(data) })
    .catch(err => console.log(err))
}

export const getOwnToken_wallet = async (accountAddress, setWalletTokenData) => {
  let currencies = await getOwnToken(accountAddress);
  if (currencies != null) {
    for (let i = 0; i < currencies.length; i++) {
      const currencyAddress = currencies[i].contractAddress;
      if (currencyAddress != '-') {
        try {
          //own token contract
          const tokenIn_decimals = currencies[i].decimals
          //BUSD token contract
          const tokenOut_decimals = await getDecimals(DefaultTokens.USDT.address)

          const amount_in = toBigNum(1, tokenIn_decimals);
          const amount_out = await pancakeswapRouterContract.methods
            .getAmountsOut(amount_in, [currencyAddress, DefaultTokens.USDT.address])
            .call();
          const tokenRate = toHuman(amount_out[1], tokenOut_decimals)
          currencies[i]['rate'] = tokenRate.toFixed(4);
          const cur = (currencies[i].balance / 10 ** currencies[i].decimals);
          currencies[i]['value'] = (cur).toFixed(2);
          currencies[i]['rateAmount'] = (tokenRate * cur).toFixed(2);
        } catch (err) {
          const tokenRate = 0;
          currencies[i]['value'] = (currencies[i].balance / 10 ** currencies[i].decimals).toFixed(4);
          currencies[i]['rate'] = tokenRate.toFixed(4);
          currencies[i]['rateAmount'] = tokenRate.toFixed(4);
          continue;
        }
      }
    }
    if (currencies.length === 0) {
      //own token contract
      const tokenIn_decimals = await getDecimals(DefaultTokens.WPRM.address)
      //BUSD token contract
      const tokenOut_decimals = await getDecimals(DefaultTokens.USDT.address)

      const amount_in = toBigNum(1, tokenIn_decimals);
      const amount_out = await pancakeswapRouterContract.methods
        .getAmountsOut(amount_in, [DefaultTokens.WPRM.address, DefaultTokens.USDT.address])
        .call();
      const tokenRate = toHuman(amount_out[1], tokenOut_decimals)
      async function getAccountBalance() {
        try {
          const balance = await web3.eth.getBalance(accountAddress);
          const amt = (web3.utils.fromWei(balance.toString(), "ether"));
          return amt; // Return the value if needed
        } catch (error) {
          return null; // Return an error value or handle the error
        }
      }     
      const amt = await getAccountBalance();
      const tokenValue = (tokenRate * amt).toFixed(4);
      
      const tokenInfoArray = {"balance": amt, "contractAddress": DefaultTokens.WPRM.address, "symbol": "PRM", "name": "Primal", "type": "ERC-20", "decimals": "18", "rate": tokenRate.toFixed(4), "value": amt, "rateAmount": tokenValue}
      currencies.push(tokenInfoArray)
    }else{
      //own token contract
      const tokenIn_decimals = await getDecimals(DefaultTokens.WPRM.address)
      //BUSD token contract
      const tokenOut_decimals = await getDecimals(DefaultTokens.USDT.address)

      const amount_in = toBigNum(1, tokenIn_decimals);
      const amount_out = await pancakeswapRouterContract.methods
        .getAmountsOut(amount_in, [DefaultTokens.WPRM.address, DefaultTokens.USDT.address])
        .call();
      const tokenRate = toHuman(amount_out[1], tokenOut_decimals)
      async function getAccountBalance() {
        try {
          const balance = await web3.eth.getBalance(accountAddress);
          const amt = (web3.utils.fromWei(balance.toString(), "ether"));
          return amt; // Return the value if needed
        } catch (error) {
          return null; // Return an error value or handle the error
        }
      }     
      const amt = await getAccountBalance();
      const tokenValue = (tokenRate * amt).toFixed(4);
      
      const tokenInfoArray = {"balance": amt, "contractAddress": DefaultTokens.WPRM.address, "symbol": "PRM", "name": "Primal", "type": "ERC-20", "decimals": "18", "rate": tokenRate.toFixed(4), "value": amt, "rateAmount": tokenValue}
      currencies.push(tokenInfoArray)
    }
  } else {
    currencies = [];
  }
  setWalletTokenData(currencies);
}

export const getTransactionList = async (accountAddress ,tokenAddress, setTransactionListData) => {
  if (tokenAddress != null) {
    const transactionLists = await getTransactionListData(accountAddress, tokenAddress);
    const transaction = [];
    if (transactionLists != null) {
      for (let i = 0; i < transactionLists.length; i++) {
        try {
          let t = transactionLists[i].timeStamp*1000;
          let time = new Date(t);
          let time_str = time.toISOString().split('.')
          let hour = time.getHours()
          let minute = time.getMinutes()
          let second = time.getSeconds()

          var sAMPM = "AM";
          var iHourCheck = parseInt(hour);
          if (iHourCheck > 12) {
            sAMPM = "PM";
            hour = iHourCheck - 12;
          }
          else if (iHourCheck === 0) {
            hour = "12";
          }
          let transactionTime = hour + ":" + minute + ":" + second
          // const tokenPrice = await getPriceByTime(tokenAddress, time_str[0]);
          // await delay(2000);

          let coinPrice = transactionLists[i].value / 10 ** 18;

          if (transactionLists[i].from === accountAddress.toLowerCase()) {
            transaction.push({
              "tokenNum": (transactionLists[i].value / 10 ** 18).toFixed(4),
              "tokenSymbol": transactionLists[i].tokenSymbol,
              "coinNum": (transactionLists[i].value / 10 ** 18).toFixed(4),
              "coinSymbol": transactionLists[i].tokenSymbol,
              // "tokenPrice": tokenPrice,
              "transactionTime": transactionTime,
              "AMPM": sAMPM,
              // "coinPrice": parseInt(transactionLists[i].buyAmount) * tokenPrice,
              "coinPrice": coinPrice,
              "status": "buy",
              "txHash": transactionLists[i].hash,
              "exchangeName": 'PC'
            })
          } else if (transactionLists[i].to === accountAddress.toLowerCase()) {
            transaction.push({
              "tokenNum": (transactionLists[i].value / 10 ** 18).toFixed(4),
              "tokenSymbol": transactionLists[i].tokenSymbol,
              "coinNum": (transactionLists[i].value / 10 ** 18).toFixed(4),
              "coinSymbol": transactionLists[i].tokenSymbol,
              // "tokenPrice": tokenPrice,
              "transactionTime": transactionTime,
              "AMPM": sAMPM,
              "coinPrice": coinPrice,
              "status": "sell",
              "txHash": transactionLists[i].hash,
              "exchangeName": 'PC'
            })
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    setTransactionListData(transaction)
  }
}