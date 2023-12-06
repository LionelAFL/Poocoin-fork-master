import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Chart from '../basic/chart';
import '../../css/multichart.css';
import { initLocalMultichart } from '../../PooCoin/util';
import DefaultTokens from "../../config/default_tokens.json"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    height: '310px',
    backgroundColor: '#141722!important',
  },
  MulAlertPadding: {
    padding: '0px !important',
    backgroundColor: '#141722',
    zIndex: -10,
  },
  closeIcon: {
    display: 'block !important',
    paddingLeft: '0px !important',
    alignItems: 'baseline !important',
    backgroundColor: '#141722',
    color: '#fff'
  },
  chartPan: {
    '& .tradingview-widget-copyright': {
      display: 'none',
    },
    color: '#fff'
  },
  chartContainer: {
    height: 285
  }
}));

export default function TransitionAlerts({ tokenAddress, index }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  let chart;

  useEffect(() => {
    if (tokenAddress != null) {
      setOpen(true)
    }
  }, [tokenAddress])

  if (tokenAddress != null) {
    if (tokenAddress == DefaultTokens.WBNB.address) {
      chart = (
        <Chart tokenAddress={tokenAddress} coinAddress={DefaultTokens.BUSD.address} height="280px" />
      );
    } else {
      chart = (
        <Chart tokenAddress={tokenAddress} coinAddress={DefaultTokens.WBNB.address} height="280px" />
      );
    }
  }

  const onClickBtn = index => () => {
    initLocalMultichart(index)
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          className={classes.MulAlertPadding}
          icon={false}
          action={
            <IconButton
              onClick={onClickBtn(index)}
              aria-label="close"
              color="inherit"
              size="small"
            >
              <CloseIcon className={classes.closeIcon} fontSize="inherit" />
            </IconButton>
          }
        >
        </Alert>
        <div className={classes.chartPan}>
          {chart}
        </div>
      </Collapse >
    </div >
  );
}