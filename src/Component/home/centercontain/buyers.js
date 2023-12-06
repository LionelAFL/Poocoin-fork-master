import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Modal } from "@material-ui/core";
import { getBuyersData } from "../../../PooCoin";
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
    head: {
        // backgroundColor: theme.palette.common.black,
        backgroundColor: "#000000",
        color: theme.palette.common.white,
        // padding: '0 0 0 10px',
        borderColor: "#000000",
        padding: 0,
    },
    body: {
        fontSize: 12,
        lineHeight: 1.43,
        // padding: 0,
        // paddingLeft: 10,
        color: "#fff",
        borderColor: "#000000",
        maxHeight: 300,
        overflow: "auto",
        padding: 0,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: "#141414",
        },
        "&:nth-of-type(even)": {
            backgroundColor: "#141722",
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 100,
        maxHeight: 200,
        overflow: "auto",
        float: "right",
        fontSize: "14px !important",
        fontFamily: '"Kanit",sans-serif',
        paddingTop: "0px",
    },
    row: {
        color: "#28a745 !important",
        textAlign: 'right',
        '& a': {
            color: '#f4e17a',
        }
    },
    tableBody: {
        maxHeight: 300,
        overflow: "auto",
    },
    th1: {
        textAlign: "right",
        paddingRight: '10px',
        fontSize: '15px',
    },
    th2: {
        textAlign: "right",
        paddingRight: '10px',
        fontSize: '15px',
    },
    CircularProgress: {
        color: "#b2b5be",
        marginTop: '20px',
    },
    walletCell: {
        textAlign: 'right',
        paddingRight: '10px',
        width: '50%'
    },
    trackCell: {
        textAlign: 'right',
        paddingRight: '10px',
        padding: '2px',
    },
    amount: {
        color: '#28a745!important',
        textAlign: 'right',
        fontSize: '13px',
        paddingRight: '10px',
        fontWeight: 'bold',
    },
    link: {
        fontSize: '13px',
        fontWeight: 'bold',
    },
    track: {
        color: '#f4e17a',
        fontSize: '13px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    modalLeft: {
        textAlign: 'left',
        color: '#f4e17a !important',
        cursor: 'pointer',
    },
    modalRight: {
        textAlign: 'right',
        cursor: 'pointer',
        color: '#f4e17a !important'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000000',
    },
    paper: {
        backgroundColor: 'white',
        border: 'none',
        padding: '40px 30px 30px 30px',
        display: 'grid',
        borderRadius: '8px',
        textAlign: 'center',
    },
    title: {
        color: 'white',
        textAlign: 'left',
        marginLeft: 5,
    },
    dateTime: {
        color: '#adb5bd!important'
    }
});

function formatDate(dateVal) {
    var newDate = new Date();
    var sYear = newDate.getFullYear();
    var sMonth = newDate.getMonth() + 1;
    var sDay = padValue(newDate.getDate());
    var sHour = newDate.getHours();
    var sMinute = newDate.getMinutes();
    var timeDate = {};

    timeDate['year'] = sYear;
    timeDate['fullmonth'] = padValue(newDate.getMonth() + 1);
    timeDate['month'] = sMonth;

    if (dateVal === "current") {
        timeDate['day'] = sDay;
    } else if (dateVal === "previous") {
        timeDate['day'] = padValue(new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24).getDate());
        if (sDay == 1) {
            timeDate['month'] = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24).getMonth() + 1;
            timeDate['fullmonth'] = padValue(timeDate['month']);
        }
    }

    timeDate['fullhour'] = padValue(newDate.getHours());

    var sMinute = (Math.round(sMinute / 15) * 15) % 60;
    timeDate['minute'] = padValue(sMinute);

    var sAMPM = "AM";
    var iHourCheck = parseInt(sHour);
    if (iHourCheck > 12) {
        sAMPM = "PM";
        sHour = iHourCheck - 12;
    }
    else if (iHourCheck === 0) {
        sHour = "12";
    }
    sHour = padValue(sHour);

    timeDate['hour'] = sHour;
    timeDate['ap'] = sAMPM;
    return timeDate;
}

function padValue(value) {
    return (value < 10) ? "0" + value : value;
}

export default function CustomizedTables() {
    const classes = useStyles();

    const [buyersData, setBuyersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const tokenAddress = useSelector((state) => state.tokenAddress)
    const [open, setModalOpen] = useState(false);
    const currentTimeInfo = formatDate("current");
    const previousTimeInfo = formatDate("previous");

    const modalClose = () => {
        setModalOpen(false);
    };

    const modalOpen = () => {
        setModalOpen(true);
    }

    const setBuyersValues = (data) => {
        if (data.length === 0) {
            setLoading(true)
        } else {
            setLoading(false)
            setBuyersData(data);
        }
    };

    useEffect(() => {
        getBuyersData(tokenAddress, currentTimeInfo, previousTimeInfo, setBuyersValues);
    }, []);

    const currentDate = currentTimeInfo.month + "/" + currentTimeInfo.day + "/" + currentTimeInfo.year + "," + currentTimeInfo.hour + ":" + currentTimeInfo.minute + " " + currentTimeInfo.ap;
    const previousDate = previousTimeInfo.month + "/" + previousTimeInfo.day + "/" + previousTimeInfo.year + "," + previousTimeInfo.hour + ":" + previousTimeInfo.minute + " " + previousTimeInfo.ap;

    return (
        <div>
            <TableContainer>
                <div className={classes.title}>
                    <p>Biggest buyers from <span className={classes.dateTime}>{previousDate}</span> to <span className={classes.dateTime}>{currentDate}</span></p>
                </div>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className={classes.th1}>Wallet</StyledTableCell>
                            <StyledTableCell className={classes.th2}>Total Bought</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {buyersData.map((row, index) => (
                            <StyledTableRow key={index} className={classes.row}>
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    className={classes.walletCell}
                                >
                                    <a
                                        href={`https://prmscan.org/token/${tokenAddress}?a=${row.wallet}`}
                                        target="_blank"
                                        className={classes.link}
                                    >
                                        {row.wallet}
                                    </a>
                                </StyledTableCell>
                                <StyledTableCell className={classes.amount}>
                                    ${(row.usdAmount).toFixed(2)}
                                </StyledTableCell>
                                <StyledTableCell className={classes.trackCell}>
                                    <a className={classes.track} onClick={() => modalOpen()}>Track</a>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {loading && (
                <CircularProgress size={20} className={classes.CircularProgress} />
            )}
            <Modal
                className={classes.modal}
                open={open}
                onClose={modalClose}
            >
                <div className={classes.paper}>
                    <h1>Premium required</h1>
                    <p>This features requires premium tier 1.</p>
                    <p>Unlock this premium tier by holding $100 worth of <a className={'textBlue fs3'} target="_blank" href="https://primalswap.io/swap#/add/ETH/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619">POOCOIN/BNB LP</a></p>
                    <p>(approximately Infinity POOCOIN/BNB LP created from Infinity <a className={'textBlue fs3'} target="_blank" href="polygon/swap?outputCurrency=0xB27ADAfFB9fEa1801459a1a81B17218288c097cc">POOCOIN</a> and Infinity BNB)
                        tokens in your wallet.</p>
                </div>
            </Modal>
        </div>
    );
}
