import React from 'react';
import InLineLink from '../Component/InLineLink';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Card, Link, CardContent, TableContainer, Table, TableBody, TableHead, TableCell, TableRow } from '@material-ui/core';
import '../css/sniperwatchertable.css'

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: '-webkit-center',
        color: 'white'
    },
    card: {
        maxWidth: '1200px',
        backgroundColor: '#303032',
        padding: '10px',
        marginTop: '1rem',
        color: 'white',
        [theme.breakpoints.down("lg")]: {
            maxWidth: '1200px'
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
    table: {
        textAlign: '-webkit-center',
        '& .MuiTableCell-root.MuiTableCell-head': {
            color: 'white',
        },
        '& .MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight': {
            color: 'white',
            border: '1px solid #000000',
        },
        '& .MuiTableCell-root': {
            padding: '0 10px',
        }
    },
    row: {
        height: '30px',
    },
    container: {
        maxHeight: '90%',
    },
}));

const columnName = ['Wallet', 'Amount', 'Priority (Higher is earlier)', 'Token', 'Pending Since'];
const rows = [
    {walletAddress: '0xA40dB8c4484603163aBd1f1B11e2ACFBda0d00A7', walletLink: 'https://prmscan.org/address/0xA40dB8c4484603163aBd1f1B11e2ACFBda0d00A7', usd: 1021.45, wbnb: 3.0000, priority: 1071, tokenType: 'TALENTO Finance (TTO)', tokenAddress: '0x2ff4A0D9E9C3A0E3D9c17B7962bFAD830598edA2', pendingSince: '8/8/2021, 2:55:31 AM'},
    {walletAddress: '0xA40dB8c4484603163aBd1f1B11e2ACFBda0d00A7', walletLink: 'https://prmscan.org/address/0xA40dB8c4484603163aBd1f1B11e2ACFBda0d00A7', usd: 1021.45, wbnb: 3.0000, priority: 1071, tokenType: 'TALENTO Finance (TTO)', tokenAddress: '0x2ff4A0D9E9C3A0E3D9c17B7962bFAD830598edA2', pendingSince: '8/8/2021, 2:55:31 AM'},
    {walletAddress: '0xA40dB8c4484603163aBd1f1B11e2ACFBda0d00A7', walletLink: 'https://prmscan.org/address/0xA40dB8c4484603163aBd1f1B11e2ACFBda0d00A7', usd: 1021.45, wbnb: 3.0000, priority: 1071, tokenType: 'TALENTO Finance (TTO)', tokenAddress: '0x2ff4A0D9E9C3A0E3D9c17B7962bFAD830598edA2', pendingSince: '8/8/2021, 2:55:31 AM'},
];

export default function Ape() {
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <h1>Sniper Watcher</h1>
            <h2>Check if a token launch is about to be botted.</h2>
            <p style={{lineHeight: 1.5}}>
                These are pending orders inside a token launch sniper bot that will be placed when the token goes on sale.
            </p>
            <Card className={classes.card}>
                <CardContent>
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableHead>
                            <TableRow>
                                <TableCell style={{textAlign: '-webkit-center', backgroundColor:'#000000', padding: 0}}>Wallet</TableCell>
                                <TableCell style={{textAlign: '-webkit-center', backgroundColor:'#000000', padding: 0}}>Amount</TableCell>
                                <TableCell style={{textAlign: '-webkit-center', backgroundColor:'#000000', padding: 0}}>Priority<br></br>(Higher is earlier)</TableCell>
                                <TableCell style={{textAlign: '-webkit-center', backgroundColor:'#000000', padding: 0}}>Token</TableCell>
                                <TableCell style={{textAlign: '-webkit-center', backgroundColor:'#000000', padding: 0}}>Pending Since</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow className={classes.row} key={row.walletAddress}>
                                        <TableCell style={{border: '1px solid #000000'}}>
                                            <InLineLink fontSize=".75rem" text={row.walletAddress} url={row.walletLink}></InLineLink>
                                        </TableCell>
                                        <TableCell align="right">
                                            <p style={{fontSize:'.9rem', color:'#289C44', padding: 0, lineHeight:0.5}}>${row.usd}</p>
                                            <p style={{fontSize:'.75rem', color:'#6A6E73' ,padding: 0, lineHeight:0.5}} >{row.wbnb}WBNB</p>
                                        </TableCell>
                                        <TableCell style={{minWidth: '120px', border: '1px solid #000000', color:'white'}} align="center">{row.priority}</TableCell>
                                        <TableCell align="left" style={{border: '1px solid #000000'}}>
                                            <Link href={'https://prmscan.org/token/' + row.tokenAddress} color='#6A6E73'>
                                                <p style={{fontSize:'.9rem', color:'white',padding: 0, lineHeight:0.5}}>{row.tokenType}</p>
                                                <p style={{fontSize:'.9rem', color:'#6A6E73',padding: 0, lineHeight:0.5}}>{row.tokenAddress}</p>
                                            </Link>
                                        </TableCell>
                                        <TableCell style={{minWidth: '160px'}} align="right">
                                            {row.pendingSince}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>                    
                </CardContent>
            </Card>
        </div>
    )
}