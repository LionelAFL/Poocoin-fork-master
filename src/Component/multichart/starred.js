import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StarIcon from '@material-ui/icons/Star';
import { removeLocalTokenInfo } from '../../PooCoin/util';
import { storeLocalMultichart } from '../../PooCoin/util';

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#000000',
    color: theme.palette.common.white,
    padding: 0,
    paddingLeft: 10,
    textAlignLast: 'center',
    borderColor: '#000000'
  },
  body: {
    fontSize: '0.875rem',
    padding: 0,
    paddingLeft: 10,
    maxWidth: 100,
    backgroundColor: '#1C1C1C',
    color: '#fff',
    textAlignLast: 'center',
    borderColor: '#000000'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 100,
    fontSize: "0.875rem",
    padding: "10px !important",
    color: "#fff",
  },
  tableTh: {
    padding: 0,
    fontSize: "0.8125rem",
    paddingLeft: 10,
    backgroundColor: "#000000",
  },
  starredFillIcon: {
    color: '#f7b500!important',
    cursor: 'pointer'
  },
  tokenList: {
    cursor: 'pointer',
  }
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const [reload, setReloading] = useState(1);

  const rows = JSON.parse(localStorage.getItem('starred'))

  const reloadComponent = () => {
    reload == 1 ? setReloading(0) : setReloading(1)
  }

  const removeStarredData = starredData => () => {
    removeLocalTokenInfo(starredData)
    reloadComponent()
  }

  const addMultichartInfo = tokenAddress => () => {
    storeLocalMultichart(tokenAddress);
    props.onSymbol()
  }

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tokens</StyledTableCell>
            <StyledTableCell>Balance</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows != null &&
            Object.keys(rows).map((key) => (
              <StyledTableRow key={key}>
                <StyledTableCell className={classes.tokenList} component="th" scope="row" onClick={addMultichartInfo(key)}>
                  {rows[key].name}&nbsp;
                  <span className={'textSuccess'}>${parseFloat(rows[key].amount).toFixed(4)}</span>
                  <br />
                  <span className={'textMuted'}>{rows[key].name}</span>
                </StyledTableCell>
                <StyledTableCell>
                  <span>0.00</span>
                  <br />
                  <span className={'textSuccess'}>$0.00</span>
                </StyledTableCell>
                <StyledTableCell>
                  <StarIcon className={classes.starredFillIcon} onClick={removeStarredData(key)} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}