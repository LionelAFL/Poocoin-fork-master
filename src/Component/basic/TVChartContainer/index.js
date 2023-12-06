import React, { useEffect } from 'react';
import Datafeed from './api'
import { makeStyles } from '@material-ui/core/styles';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const useStyles = makeStyles({
	ChartContainer: {
	}
});
export default function TVChartContainer(props) {
	const { tokenAddress, coinAddress, height } = props;
	const classes = useStyles();
	const containerId = 'tv_chart_container' + '_' + Math.random();
	useEffect(() => {
		const widget = (window.tvWidget = new window.TradingView.widget(
			widgetOptions
		));
		widget.onChartReady(() => {
			console.log("Chart has loaded!");
		});
	}, [tokenAddress, coinAddress])
	const widgetOptions = {
		width: '100%',
		height: height,
		debug: false,
		symbol: tokenAddress + '/' + coinAddress,
		datafeed: Datafeed,
		interval: '60',
		container_id: containerId,
		library_path: '/charting_library/',
		locale: getLanguageFromURL() || 'en',
		disabled_features: ['use_localstorage_for_settings'],
		enabled_features: ['study_templates'],
		// charts_storage_url: 'https://saveload.tradingview.com',
		charts_storage_api_version: '1.1',
		client_id: 'tradingview.com',
		user_id: 'public_user_id',
		fullscreen: false,
		autosize: false,
		studies_overrides: {},
		toolbar_bg: "#131722",
		overrides: {
			"paneProperties.background": "#131722",
			"paneProperties.vertGridProperties.color": "#363c4e",
			"paneProperties.horzGridProperties.color": "#363c4e",
			"symbolWatermarkProperties.transparency": 90,
			"scalesProperties.textColor": "#AAA",
			"mainSeriesProperties.candleStyle.wickUpColor": '#26A69A',
			"mainSeriesProperties.candleStyle.wickDownColor": '#EF5350',
		}
	};

	return (
		<div>
			<div
				id={containerId}
				className={classes.ChartContainer}
			/>
		</div>
	);
}
