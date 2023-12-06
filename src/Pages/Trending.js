import React from 'react';

import { Card, CardContent, Grid, Container } from '@material-ui/core';
import TextInBox from '../Component/TextInBox';
import InLineLink from '../Component/InLineLink';
import { NativeSelect, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from "@material-ui/styles";
import { useState } from 'react';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';

import MostLinkedToken1 from '../Images/TokenIcons/logo.png'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: '-webkit-center',
  },
  intro: {
    color: 'white',
    maxWidth: '80%',
    
  },
  table: {
    maxWidth: '100%',
    color: 'white',
    backgroundColor: '#303032',
    '& .MuiTableCell-body': {
      overflowWrap: 'break-word',
      color: 'white',
    },
    '& .MuiTableCell-head': {
      color: 'white'
    }

  },
  card: {
    color: 'white',
    maxWidth: '90%',
    paddingTop: '10px',
    backgroundColor: '#303032',
    marginTop: '10px',
    [theme.breakpoints.down("lg")] : {
      maxWidth: '90%'
      },
    [theme.breakpoints.down("md")] : {
      maxWidth: '90%'
      },
    [theme.breakpoints.down("sm")] : {
      maxWidth: '90%'
      },
    [theme.breakpoints.down("xs")] : {
      maxWidth: '90%'
      },          
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

export default function Tools () {
  const classes = useStyles();
  const theme = useTheme();

  const timeFrames = [
     '30 minutes',
     '1 hour',
     '3 hours',
     '6 hours',
     '12 hours',
     '24 hours',
     '48 hours',
  ]
  const [timeFrame, setTimeFrame] = React.useState('24 hours');

  const handleChange = (event) => {
    setTimeFrame(event.target.value);
    console.log(timeFrame);
  };
  const optionItems = timeFrames.map((timeFrame) =>
    <option value={timeFrame}>{timeFrame}</option>
  );

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const mostLinkedTokens = [
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
  ];

  const mostViewedTokens = [
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
    {rank: 1, address: '0xe320df552e78d57e95cf1182b6960746d5016561', img: MostLinkedToken1, name1:'DogeCola', name2:'DOGECOLA'},
  ];
  return (
      <div className={classes.root} >
          <div className={classes.intro}>
            <h1>Trending</h1>
            <h2>View most linked tokens and external websites.</h2>
            <p style={{lineHeight: 1.5}}>
              This is a list of websites that users have clicked poocoin links on (ones that have not disabled referer headers from their links).<br></br>
              Search engines and social media websites have been filtered out of the list to make it only show other BSC projects.
            </p>
          </div>
          <Card className={classes.card}>
            <CardContent>
              <TextInBox bgColor="#000000" fgColor="#BA323F" text="This list is auto-generated based on external traffic to this website. Use caution when visiting these websites, it is possible that some may be scams.">              
              </TextInBox>
              <p style={{color:'white', textAlign:'left', padding: '0px 40px', lineHeight: 1.5}}>
              Unlock&nbsp;
                <InLineLink text="Premium tier 3" url="https://poocoin.app/premium"></InLineLink>
                &nbsp;to view more timeframes and list the top 100 instead of 10.
              </p>
              <div>
                  <p>Timeframe</p>
                  <FormControl variant="outlined" className={classes.CSelect}>
                    <Select
                      native
                      value={timeFrame}
                      onChange={handleChange}
                    >
                      {timeFrames.map((frame, _) => (
                      <option value={frame} style={{backgroundColor: '#303032'}}>{frame}</option>
                      ))}
                    </Select>
                </FormControl>
              </div>
              <Container style={{margin: '20px 0'}}>
                  <Grid container spacing={2}>
                    <Grid item md={4} xs={12}>
                      <h2>Most Linked Tokens</h2>
                        <TableContainer component={Paper} className={classes.table}>
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell style={{border: '1px solid #000000'}}>Rank</TableCell>
                                <TableCell style={{border: '1px solid #000000'}}>Token</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {mostViewedTokens.map((token, _) => (
                                <TableRow>
                                  <TableCell style={{border: '1px solid #000000', paddingBottom: 0}} component="th" scope="row">
                                      {token.rank}
                                  </TableCell>
                                  <TableCell style={{wordBreak: 'break-all', border: '1px solid #000000', paddingBottom: 0}} align="left">
                                      <InLineLink url={token.address} text={token.address}></InLineLink>
                                      <div>
                                        <img src={token.img} style={{display: 'inline-block', width: '25px', verticalAlign: 'super'}}></img>
                                        <div style={{display: 'inline-block'}}>
                                            <p style={{lineHeight:0}}>{token.name1}</p>
                                            <p>{token.name2}</p>
                                        </div>
                                      </div>                   
                                  </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item md={4} xs={12} spacing={4}>
                      <h2>Most Viewed Tokens</h2>
                        <TableContainer component={Paper} className={classes.table}>
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell style={{border: '1px solid #000000'}}>Rank</TableCell>
                                <TableCell style={{border: '1px solid #000000'}}>Token</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {mostViewedTokens.map((token, _) => (
                                <TableRow>
                                  <TableCell style={{border: '1px solid #000000'}} component="th" scope="row">
                                      {token.rank}
                                  </TableCell>
                                  <TableCell style={{wordBreak: 'break-all', border: '1px solid #000000', paddingBottom: 0}} align="left">
                                      <InLineLink url={token.address} text={token.address}></InLineLink>
                                      <div>
                                        <img src={token.img} style={{display: 'inline-block', width: '25px', verticalAlign: 'super'}}></img>
                                        <div style={{display: 'inline-block'}}>
                                            <p style={{lineHeight:0}}>{token.name1}</p>
                                            <p>{token.name2}</p>
                                        </div>
                                      </div>                   
                                  </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                    </Grid>
                  </Grid>
              </Container>              
            </CardContent>
          </Card>
      </div>
  )
}