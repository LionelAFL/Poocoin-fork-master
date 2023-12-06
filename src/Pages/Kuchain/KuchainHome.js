import React from "react";
import Tab from "../../Component/kuchain/hometab";
import Input from "../../Component/basic/input";
import TokenSelect from "../../Component/TokenSelect";
import { makeStyles } from "@material-ui/core/styles";

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
        fontSize: '1.7rem',
        textDecoration: 'underline',
        cursor: 'pointer',
    }
});

export default function KuchainHome() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.pageHeader}>
                <h1 className={classes.title}>KuChain Charts</h1>
                <div className={classes.centerText}>
                    View price charts for any token in your wallet (KuChain)
                </div>
                <div className={classes.centerText}>
                    <a className={classes.tLink} href="https://www.kucoin.com/ucenter/signup?rcode=rJTXAN8" target="_blank">Signup to KuCoin</a> to get onto the KuChain.
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
