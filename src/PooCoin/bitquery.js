import { ethers } from 'ethers';
import defaultToken from '../config/default_tokens.json'



export const getOwnToken = async (accountAddress) => {
  const QUERY = `{
  ethereum(network: bsc) {
    address(address: {is: "${accountAddress}"}) {
      balances {
        currency {
          address
          symbol
          tokenType
        }
        value
      }
    }
  }
}`;

  // -------- Endpoint ----------------------
  const endpoint = `https://explorer.prmscan.org/api?module=account&action=tokenlist&address=${accountAddress}`;

  // Function which fetches the data from the API
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  }).catch((err) => { 
    console.log(err)
    return null 
  });

  if (response == null) {
    return null;
  }

  const data = await response.json();
  const currency = data.result;
  return currency;
}

export const getTransactionListData = async (accountAddress, tokenAddress) => {
  // any: {baseCurrency: {is: "${tokenAddress}"}}
  const QUERY = `{
    ethereum(network: bsc) {
      dexTrades(
        options: {limit: 20, desc: "block.height"}
        exchangeName: {in: ["Pancake", "Pancake v2"]}
        baseCurrency: {is: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"}
      ) {
        transaction {
          hash
        }
        block {
          height
        }
        buyCurrency {
          symbol
          address
        }
        sellCurrency {
          symbol
          address
        }
        buyAmount(calculate: maximum)
        sellAmount(calculate: maximum)
        any(of: time)
        exchange {
          fullName
        }
        tradeAmount(in: USD)
      }
    }
}`;

  // -------- Endpoint ----------------------
  const endpoint = `https://explorer.prmscan.org/api?module=account&action=tokentx&address=${accountAddress}&contractaddress=${tokenAddress}`;

  // Function which fetches the data from the API
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: QUERY
    })
  }).catch((err) => { 
    return null });
  if (response == null) {
    return null;
  }
  const data = await response.json();
  const currency = data.result;
  return currency;
}

export const getPriceByTime = async (tokenAddress, time) => {
  const QUERY = `{
    ethereum(network: bsc) {
      dexTrades(
        options: {desc: ["block.height", "tradeIndex"], limit: 1}
        exchangeName: {in: ["Pancake", "Pancake v2"]}
        baseCurrency: {is: "${tokenAddress}"}
        quoteCurrency: {is: "${defaultToken.BUSD.address}"}
        time: {before: "${time}"}
      ) {
        transaction {
          hash
        }
        tradeIndex
        smartContract {
          address {
            address
          }
          contractType
          currency {
            name
          }
        }
        tradeIndex
        quoteCurrency {
          symbol
          address
        }
        quotePrice
        block {
          height
        }
        baseCurrency {
          address
        }
      }
    }
  }`;

  // -------- Endpoint ----------------------
  const endpoint = "https://graphql.bitquery.io/";

  // Function which fetches the data from the API
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      // "Access-Control-Allow-Headers":
      //   "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    },
    body: JSON.stringify({
      query: QUERY
    })
  });

  const data = await response.json();
  const currency = data.data.ethereum.dexTrades[0].quotePrice;
  return currency;
}

export const getTransactionOwnerToken = async () => {
  const QUERY = `{
    ethereum(network: bsc) {
      dexTrades(
        options: {limit: 20, desc: "block.height"}
        exchangeName: {in: ["Pancake", "Pancake v2"]}
        any: {baseCurrency: {is: "0x580de58c1bd593a43dadcf0a739d504621817c05"}, txSender: {is: "0x1660cd15544fdf176677079a0675c8c59f020e84"}}
      ) {
        transaction {
          hash
        }
        block {
          height
        }
        buyCurrency {
          symbol
          address
        }
        sellCurrency {
          symbol
          address
        }
        buyAmount(calculate: maximum)
        sellAmount(calculate: maximum)
        any(of: time)
        exchange {
          fullName
        }
        tradeAmount(in: USD)
      }
    }
  }`;

  // -------- Endpoint ----------------------
  const endpoint = "https://graphql.bitquery.io/";

  // Function which fetches the data from the API
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QUERY
    })
  });

  const data = await response.json();
  const currency = data.data.ethereum.dexTrades;
  return currency;
}

export const getChartInfo = async (tokenAddress, coinAddress) => {
  const QUERY = `{
    ethereum(network: bsc) {
      dexTrades(
        options: {limit: 320, desc: "timeInterval.minute"}
        exchangeName: {is: "Pancake v2"}
        baseCurrency: {is: "${tokenAddress}"}
        quoteCurrency: {is: "${coinAddress}"}
        date: {}
      ) {
        timeInterval {
          minute(format: "%FT%TZ", count: 15)
        }
        volume: quoteAmount
        high: quotePrice(calculate: maximum)
        low: quotePrice(calculate: minimum)
        open: minimum(of: block, get: quote_price)
        close: maximum(of: block, get: quote_price)
        baseCurrency {
          name
        }
        quoteCurrency {
          name
        }
      }
    }
  }`;

  // -------- Endpoint ----------------------
  const endpoint = "https://graphql.bitquery.io/";

  // Function which fetches the data from the API
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QUERY
    })
  });

  const data = await response.json();
  const currency = data.data.ethereum.dexTrades;
  return currency;
}