import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

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

const rows = Array.from(Array(1).keys()).map(item => {
  return {
    name: "THOREUM",
    othername: "Thoreum",
    id: "0x580de58c1bd593a43dadcf0a739d504621817c05",
    tokenMoney: "0.0000",
    balanceMoney: "0.00",
    calories: '0.00'
  }
})
const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

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
        </TableBody>
      </Table>
    </TableContainer>
  );
}