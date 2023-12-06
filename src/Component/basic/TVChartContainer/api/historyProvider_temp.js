import { getChartInfo } from '../../../../PooCoin/bitquery';
const history = {}
export default {
	history: history,

	getBars: function (symbolInfo, resolution, from, to, first, limit) {
		return getChartInfo(symbolInfo.ticker[0], symbolInfo.ticker[1]).then(data => {
			if (data.length) {
				const bars = [];
				let index = data.length - 1;
				for (let i = index; i >= 0; i--) {
					const data_tmp = {};
					data_tmp['time'] = new Date(data[i].timeInterval.minute).getTime();
					data_tmp['low'] = data[i].low;
					data_tmp['high'] = data[i].high;
					data_tmp['open'] = data[i].open;
					data_tmp['close'] = data[i].close;
					data_tmp['volume'] = data[i].volume;
					bars.push(data_tmp)
				}
				if (first) {
					var lastBar = bars[bars.length - 1]
					history[symbolInfo.name] = { lastBar: lastBar }
				}
				return bars
			} else {
				return []
			}
		})
	}
}
