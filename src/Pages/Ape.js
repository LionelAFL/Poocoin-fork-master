/* eslint-disable no-loop-func */
import React, { Component, useEffect, useState } from 'react';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Card, Button, FormControl, Select, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import InLineLink from '../Component/InLineLink';
import { green } from '@material-ui/core/colors';
import { apeLists } from '../PooCoin/index.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: '-webkit-center',
    color: 'white'
  },
  desc: {
    maxWidth: '1116px',
    padding: '10px',
    marginTop: '1rem',
    color: 'white',
    [theme.breakpoints.down("lg")]: {
      maxWidth: '1116px'
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: '936px'
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: '696px'
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: '516px'
    },
  },
  card: {
    maxWidth: '85%',
    backgroundColor: '#303032',
    padding: '10px',
    marginTop: '1rem',
    color: 'white',
    [theme.breakpoints.down("lg")]: {
      maxWidth: '85%'
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: '90%'
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: '90%'
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: '90%'
    },
  },
  table: {
    maxWidth: '100%',
    color: 'white',
    '& .MuiTableCell-body': {
      overflowWrap: 'break-word',
      color: 'white',
    },
    '& .MuiTableCell-head': {
      color: 'white'
    }

  },
  CSelect: {
    '& .MuiSelect-root.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
      padding: '5px 190px 5px 5px',
      color: 'white',
      border: 'groove',
      borderRadius: '10px',
    },
    '& .MuiSvgIcon-root.MuiSelect-icon.MuiSelect-iconOutlined': {
      color: 'white'
    }
  }
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const tokensVersion1 = [
  { token: { name1: 'BabyMNG', name2: 'BabyMNG' }, creationTime: '7:00:31 AM', duration: '1d 12:01:48', contract: 'https://prmscan.org/address/0x9477f61bafaa1a73afb95efbcca7e318b734d9b9#code', holders: 'https://prmscan.org/token/0x9477f61bafaa1a73afb95efbcca7e318b734d9b9#balances', bnbLPHolders: 'https://prmscan.org/token/0x9b44864B72C0D90Cd4942921505b254b0998B36E#balances', ape: 'https://poocoin.app/swap?outputCurrency=0xa5503ffaf57566bb1996f3885cade1f92fe84fc8' },
  { token: { name1: 'BabyMNG', name2: 'BabyMNG' }, creationTime: '7:00:31 AM', duration: '1d 12:01:48', contract: 'https://prmscan.org/address/0x9477f61bafaa1a73afb95efbcca7e318b734d9b9#code', holders: 'https://prmscan.org/token/0x9477f61bafaa1a73afb95efbcca7e318b734d9b9#balances', bnbLPHolders: 'https://prmscan.org/token/0x9b44864B72C0D90Cd4942921505b254b0998B36E#balances', ape: 'https://poocoin.app/swap?outputCurrency=0xa5503ffaf57566bb1996f3885cade1f92fe84fc8' }
];
const tokensVersion2 = [
  { token: { name1: 'BabyDoggy', name2: 'BabyDoggy' }, creationTime: '7:09:18 AM', duration: '1d 11:59:29', contract: 'https://prmscan.org/address/0x9477f61bafaa1a73afb95efbcca7e318b734d9b9#code', holders: 'https://prmscan.org/token/0x9477f61bafaa1a73afb95efbcca7e318b734d9b9#balances', bnbLPHolders: 'https://prmscan.org/token/0x9b44864B72C0D90Cd4942921505b254b0998B36E#balances', ape: 'https://poocoin.app/swap?outputCurrency=0xa5503ffaf57566bb1996f3885cade1f92fe84fc8' },
  { token: { name1: 'BabyMNG', name2: 'BabyMNG' }, creationTime: '7:00:31 AM', duration: '1d 12:01:48', contract: 'https://prmscan.org/address/0x9477f61bafaa1a73afb95efbcca7e318b734d9b9#code', holders: 'https://prmscan.org/token/0x9477f61bafaa1a73afb95efbcca7e318b734d9b9#balances', bnbLPHolders: 'https://prmscan.org/token/0x9b44864B72C0D90Cd4942921505b254b0998B36E#balances', ape: 'https://poocoin.app/swap?outputCurrency=0xa5503ffaf57566bb1996f3885cade1f92fe84fc8' }
];

async function getTokenName(values) {

  const data = JSON.stringify({ values: values });

  return await axios.get(`${process.env.REACT_APP_API}token/getToken/` + data);
}

function ApeTable(props) {
  const values = props.values;
  const classes = props.styleName;

  // let items = [];
  // getTokenName(values).then(res => {
  //   items = res.data;
  //   console.log(items);
  // });
  // console.log(items);
  return (
    values.map((item, index) =>
      <TableRow key={index}>
        <TableCell component="th" scope="row" align="center">
          <a href={"https://poocoin.app/tokens/" + item.from} target="_blank" rel="noreferrer">
            {item.symbol} <br></br>
            <span style={{ color: '#adb5bd' }}>{item.name}</span>
          </a>
        </TableCell>
        <TableCell align="center">
          {new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}<br></br>
          <span style={{ color: '#adb5bd', fontSize: '14px' }}>00:01:12 Since creation  </span>
        </TableCell>
        <TableCell style={{ 'width': '240px' }}>
          <div style={{ float: 'left', display: 'inline-block' }}><InLineLink fontSize='14px' url={'https://prmscan.org/address/' + item.from + '#code'} text="Contract" target="_blank"></InLineLink></div>
          <div style={{ float: 'right' }}><InLineLink fontSize='14px' url={'https://prmscan.org/token/' + item.from + '#balances'} text="Holders" target="_blank"></InLineLink></div><br></br>
          <div style={{ float: 'right' }}><InLineLink fontSize='14px' url={'https://prmscan.org/token/' + item.to + '#balances'} text="BNB LP Holders" target="_blank"></InLineLink></div>
        </TableCell>
        <TableCell align="center">
          <ThemeProvider theme={theme}>
            <a href={'https://poocoin.app/swap?outputCurrency=' + item.from} target="_blank" rel="noreferrer">
              <Button style={{ color: 'white' }} variant="contained" color="primary" className={classes.margin}>
                Ape
              </Button>
            </a>
          </ThemeProvider>
        </TableCell>
      </TableRow>
    )
  );
}

export default function Ape() {
  const classes = useStyles();
  const [version, setVersion] = React.useState(1);
  const [token, setToken] = React.useState(tokensVersion1);
  const handleChange = (event) => {
    let value = event.target.value;
    setVersion(value);
    value === 1 ? setToken(tokensVersion1) : setToken(tokensVersion2);
  };

  const [apeArray, setApeArray] = useState([]);

  const setApeArrayData = (data) => {
    // getTokenName(data).then(res => {
    //   setApeArray(res.data);
    // });
    setApeArray(data);
  }

  useEffect(() => {
    apeLists(setApeArrayData);
  }, []);

  return (
    <div className={classes.root}>
      <div style={{ textAlign: '-webkit-center' }}>
        <h1>Ape</h1>
        <h2>Scan for new BSC token launches</h2>
        <div style={{ textAlign: 'left' }} className={classes.desc}>
          <p>
            This list auto-refreshes every block, you dont need to refresh the page.
          </p>
          <p>
            Suggestions on what to check:
          </p>
          <div style={{ paddingLeft: '1rem' }}>
            <li>Search the token name in Telegram, see if there is a Telegram group for the token.</li>
            <li>Click "Contract" and check there is no mint function.</li>
            <li>Click "Holders" and check most of the supply is in the LP.</li>
            <li>Click "BNB LP Holders" and check most of the supply is locked or burned.</li>
          </div>
          <p style={{ color: '#f7b500' }}>Most of these tokens are likely not real projects or scams. Dont buy unless you know how to check if they are a rug token.</p>
          <div style={{ paddingLeft: '1rem', maxWidth: '400px', display: 'inline-flex' }}>
            <span style={{ margin: '8px 20px' }}>LPVersion</span>
            <FormControl variant="outlined" className={classes.CSelect}>
              <Select
                native
                value={version}
                onChange={handleChange}
              >
                <option value={1} style={{ backgroundColor: '#303032' }}>Version 1</option>
                <option value={2} style={{ backgroundColor: '#303032' }}>Version 2</option>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <Card className={classes.card}>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell style={{ textAlign: '-webkit-center' }}>Token</TableCell>
                <TableCell style={{ textAlign: '-webkit-center' }}>Creation Time</TableCell>
                <TableCell style={{ textAlign: '-webkit-center' }}>Info</TableCell>
                <TableCell style={{ textAlign: '-webkit-center' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <ApeTable values={apeArray} styleName={classes} />
              {/* {
                token.map((token, _) =>(
                  <TableRow key={token.token.name1}>
                    <TableCell component="th" scope="row">
                      {token.token.name1} <br></br>
                      {token.token.name2}
                    </TableCell>
                    <TableCell align="center">
                      {token.creationTime}<br></br>    
                      {token.duration} Since creation                              
                    </TableCell>
                    <TableCell style={{'width': '240px'}}>
                        <div style={{ float: 'left', display: 'inline-block' }}><InLineLink fontSize='14px' url={token.contract} text="Contract"></InLineLink></div>
                        <div style={{float: 'right'}}><InLineLink fontSize='14px'  url={token.holders} text="Holders"></InLineLink></div><br></br>
                        <div style={{float: 'right'}}><InLineLink fontSize='14px' url={token.bnbLPHolders} text="BNB LP Holders"></InLineLink></div>
                    </TableCell>
                    <TableCell align="center">
                        <ThemeProvider theme={theme}>
                          <Button style={{color: 'white'}} variant="contained" color="primary" className={classes.margin}>
                              Ape
                          </Button>
                        </ThemeProvider>
                    </TableCell>
                  </TableRow>
                ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}