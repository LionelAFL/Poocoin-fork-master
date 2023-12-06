import React from "react";
import Tab from "../../Component/polygon/hometab";
import Input from "../../Component/basic/input";
import TokenSelect from "../../Component/TokenSelect";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useWallet } from "use-wallet";
const useStyles = makeStyles({
    root: {
        textAlign: "center",
        color: "black",
    },
    title: {
        fontSize: "2.5em",
        fontWeight: 700,
    },
    tokenSelect: {
        marginTop: "1em",
        display: "flex",
        justifyContent: "center",
    },
    centerText: {
        fontSize: 30,
        marginTop: 10,
    },
    bottomText: {
        fontSize: '20px !important',
        marginTop: 10,
    },
    inputWidth: {
        width: "100%",
        padding: "1em 0em 1em 2em",
    },
    tabContainer: {
        minHeight: "700px !important",
    },
    rightSide: {
        margin: '17px auto 20px auto',
        backgroundColor: "#1C1C1C",
        maxWidth: 800,
        minWidth: 300,
        borderRadius: '8px',
        padding: '10px',
    },
    topSide: {
        marginLeft: "19%",
        marginTop: 20,
        color: "white",
    },
    pageHeader: {
        backgroundColor: "#ffc107",
        height: "auto",
        padding: '20px',
        color: 'black',
    },
    tLink: {
        color: 'blue',
        fontSize: '1.5rem',
        textDecoration: 'underline',
    }
});

export default function PolygonHome() {
    const classes = useStyles();
    const { account, connect, reset, status } = useWallet()
    return (
        <div className={classes.root}>
            <div className={classes.pageHeader}>
                <h1 className={classes.title}>Polygon (Matic) Charts</h1>
                <div className={classes.centerText}>
                    View price charts for any token in your wallet (Polygon chain)
                </div>
                <div className={classes.bottomText}>
                    Telegram public chat:
                    <a className={classes.tLink}>
                        {" "}
                        http://t.me/poocointokenchat{" "}
                    </a>
                </div>
            </div>
            <div className={classes.tokenSelect}>
                <TokenSelect />
            </div>
            <div className={classes.rightSide}>
                <div className={classes.inputWidth}>
                    <Input />
                </div>
                <Tab className={classes.tabContainer} />
            </div>
        </div>
    );
}
