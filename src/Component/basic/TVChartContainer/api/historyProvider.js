import { getAmountsOutChart } from "../../../../PooCoin";

const history = {}
export default {
	history: history,
	
	getBars: async function (symbolInfo, resolution, from, to, first, limit) {
		if (resolution === "1" || resolution === "15" || resolution === "60"){
			const QUERY = `{
				pairHourDatas(first: 24, where: { pair: "${symbolInfo.ticker.toLowerCase()}" }, orderBy: hourStartUnix, orderDirection: desc) {
					id
					hourStartUnix
					reserve0
					reserve1
					reserveUSD
					hourlyVolumeToken0
					hourlyVolumeToken1
					pair {
					  token0 {
						id
					  }
					  token1 {
						id
					  }
					}
				  }
			}`;
	
			const endpoint = "https://thegraph.primalswap.io/subgraphs/name/primex/exchange";
	
			// Function which fetches the data from the API
			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify({
				query: QUERY
				})
			}).catch(() => { return null });
	
			if (response == null) {
				return null;
			}
			const price = await response.json();
			const data = price.data.pairHourDatas;
			const tokenPrices = [];
			for (const key of Object.keys(data)) {
				if (symbolInfo.address[0].toLowerCase() === data[key].pair.token1.id.toLowerCase()){
					tokenPrices.push({
						timestamp: data[key].hourStartUnix,
						price: data[key].reserve0 / data[key].reserve1,
						volume: data[key].hourlyVolumeToken0 + data[key].hourlyVolumeToken1
					  });
				}else{
					tokenPrices.push({
						timestamp: data[key].hourStartUnix,
						price: data[key].reserve1 / data[key].reserve0,
						volume: data[key].hourlyVolumeToken0 + data[key].hourlyVolumeToken1
					  });
				}
			  }
			  const updateprice = await getAmountsOutChart(1, symbolInfo.address[0], symbolInfo.address[1]);
			  tokenPrices.unshift({
				timestamp: Math.floor(Date.now() / 1000),
				price: updateprice,
				volume: 0,
			  })
			if (tokenPrices) {
				let bars = [];
				tokenPrices.map(tokenPrices => {
						bars.unshift({
							time: tokenPrices.timestamp * 1000, // TradingView requires bar time in ms
							low: tokenPrices.price,
							high: tokenPrices.price,
							open: tokenPrices.price,
							close: tokenPrices.price,
							volume: tokenPrices.volume
						  });
					});
				return bars
			} else {
				return []
			}
		}else if (resolution === "1D"){
			const QUERY = `{
				pairDayDatas(first: 24, where: { pairAddress: "${symbolInfo.ticker.toLowerCase()}" }, orderBy: date, orderDirection: desc) {
					date
					reserve0
					reserve1
					reserveUSD
					dailyVolumeToken0
    				dailyVolumeToken1
					pairAddress {
						token0 {
						  id
						}
						token1 {
						  id
						}
					  }
				  }
			}`;
	
			const endpoint = "https://thegraph.primalswap.io/subgraphs/name/primex/exchange";
	
			// Function which fetches the data from the API
			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify({
				query: QUERY
				})
			}).catch(() => { return null });
	
			if (response == null) {
				return null;
			}
			const price = await response.json();
			const data = price.data.pairDayDatas;
			console.log(data)
			const tokenPrices = [];
			for (const key of Object.keys(data)) {
				console.log(data)
				if (symbolInfo.address[0].toLowerCase() === data[key].pairAddress.token1.id.toLowerCase()){
					tokenPrices.push({
						timestamp: data[key].date,
						price: data[key].reserve0 / data[key].reserve1,
						volume: data[key].dailyVolumeToken0 + data[key].dailyVolumeToken1,
					  });
				}else{
					tokenPrices.push({
						timestamp: data[key].date,
						price: data[key].reserve1 / data[key].reserve0,
						volume: data[key].dailyVolumeToken0 + data[key].dailyVolumeToken1,
					  });
				}
			  }
			  const updateprice = await getAmountsOutChart(1, symbolInfo.address[0], symbolInfo.address[1]);
			  tokenPrices.unshift({
				timestamp: Math.floor(Date.now() / 1000),
				price: updateprice,
				volume: 0,
			  })
			  console.log(tokenPrices)
			if (tokenPrices) {
				let bars = [];
				tokenPrices.map(tokenPrices => {
						bars.unshift({
							time: tokenPrices.timestamp * 1000, // TradingView requires bar time in ms
							low: tokenPrices.price,
							high: tokenPrices.price,
							open: tokenPrices.price,
							close: tokenPrices.price,
							volume: tokenPrices.volume
						  });
					});
				return bars
			} else {
				return []
			}
		}
	}
}