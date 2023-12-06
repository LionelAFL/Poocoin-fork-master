import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getAmountsOut } from "../../PooCoin/index";
import { getReserve } from "../../PooCoin/index";
import { numberWithCommas } from "../../PooCoin/util";
import DefaultToken from "../../config/default_tokens.json";

const useStyles = makeStyles({
  root: {
    marginBottom: '1rem'
  },
  linkTag: {
    fontSize: "14px",
    color: '#f4e17a',
  },
});

export default function LpInfoItem(props) {
  const { lpInfo, currentTokenInfo } = props;
  const classes = useStyles();
  const [lpInfoData, setLpInfoData] = useState({});
  const [priceRate, setPriceRateData] = useState(0);
  const [lpMarketcap, setLpMarketcap] = useState(0);
  const setPriceRate = (data) => {
    setPriceRateData(data)
  }
  useEffect(() => {
    const lpdataInfo = lpInfo;
    getReserve(lpdataInfo.value[2], lpdataInfo.value[3]).then((reserveData) => {
      setLpInfoData({ label: lpdataInfo.label, symbol: lpdataInfo.value[1], tokenAddress: lpdataInfo.value[0], lpAddress: lpdataInfo.value[2], reserve: reserveData });
    });
    if (lpdataInfo.value[0] == DefaultToken.USDT.address) {
      setPriceRate(1);
    } else {
      getAmountsOut(1, lpdataInfo.value[0], DefaultToken.USDT.address, setPriceRate);
    }
  }, [lpInfo]);
  // const lpMarketcap = numberWithCommas(parseInt(priceRate * lpInfo.reserve));
  useEffect(() => {
    setLpMarketcap(numberWithCommas(parseInt(priceRate * lpInfoData.reserve)))
  }, [lpInfoData, priceRate])
  return (
    <div className={classes.root}>
      <a target="_blank" className={classes.linkTag} href="https://primalswap.io/swap">Pc v2</a> | {currentTokenInfo.name}/{lpInfoData.label} LP Holdings:<br />
      {(lpInfoData.reserve === undefined) ? 0 : parseFloat(lpInfoData.reserve).toFixed(2) + lpInfoData.symbol}<span className={'textSuccess'}>{(lpInfoData.reserve === undefined) ? '($0)' : `($${lpMarketcap})`}</span> |<a target="_blank" className={classes.linkTag} href={`https://prmscan.org/token/${lpInfoData.tokenAddress}?a=${lpInfoData.lpAddress}#tokenAnalytics`}> Chart</a> | <a target="_blank" className={classes.linkTag} href={`https://prmscan.org/token/${lpInfoData.lpAddress}`}>Holders</a>
    </div>
  );
}
