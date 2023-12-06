import React from 'react';
import {Container} from '@material-ui/core';
// import Header from '../Component/Header';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    textAlign: '-webkit-center',
  },
  title: {
    color: 'white',
  },  
  table: {
    borderStyle: 'solid',
    borderWidth: '15px',
    borderColor: '#303032',
    marginTop: 0,
    textAlign: 'center',
    maxWidth: '80%',
  },
  tableCell: {
    margin: 0,
    padding: '4px',
    backgroundColor: '#D4D4D4',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#B9B9B9',
  },
  item: {
    padding: '0',
    textAlign: 'center',
  },
});

function createData(item, url) {
  return { item, url };
}

function ItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const rows = [
  createData('Telegram Price Bot', '/advertise/pricebot/primalcoin'),
  createData('Multi Chart', '/multichart'),
  createData('Trending (Most visited tokens)', '/trending'),
  createData('Sniper Bot Watcher', '/sniper-watcher'),
  createData('Ape (New token scanner)', '/ape'),
  createData('Toilet (Farm yields)', '/toilet'),
  createData('Rug Check', '/rugcheck'),
  createData('External Tools', '/external-tools'),
];

export default function Tools () {
  const classes = useStyles();
  return (
      <div className={classes.root} >
        <h1 className={classes.title}>Tools</h1>
        <TableContainer className={classes.table} component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.item}>
                  <TableCell className={classes.tableCell} component="th" scope="row">
                    <ItemLink className={classes.item} href={row.url}>
                      <ListItemText primary={row.item} />
                    </ItemLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  )
}