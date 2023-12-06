import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import TVChartContainer from './TVChartContainer';
import { coin } from '../../constants';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 0,
    boxShadow: 'inherit',
  },
  TradingView: {
    position: 'relative',
  },
  coinSelect: {
    position: 'absolute',
    top: '70px',
    right: '10px',
    fontSize: '14px',
    backgroundColor: '#16171b',
    borderRadius: '4px!important',
    color: 'white',
  },
  coinOption: {
    backgroundColor: '#16171b',
  }
});
export default function Chart(props) {
  const classes = useStyles();
  const [coinName, setCoinName] = useState(coin.USD);
  const handleChangeCoinName = (event) => {
    setCoinName(event.target.value);
  }
  return (
    <div className={classes.TradingView}>
      <TVChartContainer tokenAddress={props.tokenAddress} coinAddress={props.coinAddress} height={props.height} />
      {/* <select
        value={coinName}
        onChange={handleChangeCoinName}
        className={classes.coinSelect}>
        <option className={classes.coinOption} value={coin.USD}>USD</option>
        <option className={classes.coinOption} value={coin.BNB}>BNB</option>
      </select> */}
    </div>
  );
}