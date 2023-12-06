/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Modal } from "@material-ui/core";
import Error from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: "#1C1C1C",
        fontSize: "12px !important",
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
        width: '40%',
        position: 'relative',
        [theme.breakpoints.down("xs")]: {
            width: '100%',
            padding: '10px',
            margin: '10px',
        }
    },
    presaleAd: {
        textAlign: 'left',
        margin: '20px 0px 20px 20px',
        fontSize: '15px',
    },
    presaleAdIcon: {
        color: '#f7b500!important',
        fontWeight: 900,
        fontSize: '1.25rem',
        margin: '-2px 0px 0px 2px',
        cursor: 'pointer',
    },
    closebtn: {
        backgroundColor: 'white',
        float: 'right',
        fontSize: '3px',
        border: 0,
        borderRadius: '4px',
        cursor: 'pointer',
        position: 'absolute',
        top: 5,
        right: 5,
    },
}));

const SimpleList = ({ lpdata, totalSupply, currentTokenInfo }) => {

    const classes = useStyles();
    const [open, setModalOpen] = useState(false);
    const modalOpen = () => {
        setModalOpen(true);
    }
    const modalClose = () => {
        setModalOpen(false);
    };

    return (
        <div className={classes.root}>
            <Divider />
            <div className={classes.presaleAd}>
                <span>Presale Ad</span>
                <Error className={classes.presaleAdIcon} onClick={modalOpen} />
            </div>
            <Modal
                className={classes.modal}
                open={open}
                onClose={modalClose}
            >
                <div className={classes.paper}>
                    <button onClick={modalClose} className={classes.closebtn}>
                        <CloseIcon />
                    </button>
                    <p>
                        The ads in this spot may contain high-risk presales, some with whitelist applications required before the presale link has been revealed.
                    </p>
                    <p>
                        There is no reliable way to know the intentions of the devs in these presales. Poocoin does not know what the outcome will be or if it is a scam.
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default SimpleList;
