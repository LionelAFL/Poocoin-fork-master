import React, { Component, useEffect, useState } from 'react';
import '../../css/advertise.css';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Button, OutlinedInput } from '@material-ui/core';
import InLineLink from '../../Component/InLineLink';
import { vettedValues } from '../../PooCoin/index.js';

const useStyles = makeStyles((theme) => ({
    connect: {
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: '500',
        color: 'black',
        backgroundColor: '#53CA42',
    },
    approve: {
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: '500',
        color: '#f8f9fa',
        backgroundColor: '#6c757d',
    },
}));

function VettedTable(props) {
    const values = props.values;

    const tbody = values.map((item, index) => 
        <tr>
            <td align="right" style={{ verticalAlign: 'top', width: '20px' }}>{index+1}</td>
            <td>
                <a className={'linkText'} href={"https://poocoin.app/tokens/" + item.linkAddress}>
                    {item.name}
                    <br />
                    <span className={'fs1 textMuted'}>{item.name}</span>
                </a>
                <br />
                <span className={'fs1 textMuted'}>LP balance: {item.amount}
                    <br />
                    LP value: 
                    <span className={'textSuccess'}> $88,453.74</span>
                </span>
            </td>
        </tr>
    );
    return (
        <tbody style={{ backgroundColor: '#000000' }}>{tbody}</tbody>
    );
}

export default function Vetted() {

    const [vettedData, setVettedData] = useState([]);

    const setVettedValues = (data) => {
        setVettedData(data);
    }

    useEffect(() => {
        vettedValues(setVettedValues);
    }, []);

    const classes = useStyles();
    return (
        <div>
            <Alert className={'vettedAlert'} icon={false} severity="error">The history of all information entered here will be publicly visible on the chain.</Alert>
            <Card className={'Card mb3 mt3'}>
                <CardHeader title="Vetted promotion list" />
                <hr />
                <div>
                    <form style={{ maxWidth: '500px' }}>
                        <div className={'mb3'}>
                            <label>
                                Wallet Name
                                <br />
                                <small className={'textMuted fs2'}>
                                    A label for your wallet address.
                                </small>
                                <br />
                            </label>
                            <OutlinedInput className={'CInput'} />
                        </div>
                        <div className={'mb3'}>
                            <label>
                                Promoted token address
                                <br />
                                <small className={'textMuted fs2'}>
                                    The token you will promote if you have unlocked this feature. (Must be a valid Binance Smart Chain token address).
                                </small>
                                <br />
                            </label>
                            <OutlinedInput className={'CInput'} />
                        </div>
                        <p className={'textYellow'}>
                            Connect wallet to enable this form.
                            <br />
                        </p>
                        <Button variant="contained" className={classes.connect}>Update</Button>
                    </form>
                </div>
            </Card>
            <Card className={'Card mb3'}>
                <CardHeader title="Promotions" />
                <p>
                    Become a top-10 LP depositor to promote your token. This pool has a 5% deposit fee and does not offer a farming reward. Your promoted token will be featured in the promoted tokens list. You can withdraw at any time.
                </p>
                <Card className={'Card1 mb3'}>
                    <span className={'fs5 fwBold'}>
                        Requirements for token approval:
                    </span>
                    <p className={'textRed'}>
                        Do not purchase any POOCOIN or POOCOIN/BNB LP tokens until your token has been approved. The tx fees from purchasing POOCOIN cannot be refunded if your token is rejected.
                    </p>
                    <p>
                        Your token must have a website and have the details uploaded to PRMScan. The token contract must be verified on PRMScan. The LP for your token must be locked for at least 2 months or burned. The dev must have no more than 10% of the initial supply.
                    </p>
                    <p>
                        Reflect tokens that distribute transaction fees to all holders are allowed but ones that are coded to send transaction fees to the dev wallet will be rejected. If the contract is coded to send BNB to a charity, the only charity allowed is the official
                        <InLineLink
                            url="https://www.binance.charity/binance-charity-wallet/donate-anonymously"
                            text=" Binance Charity Wallet "
                            fontSize="1rem"
                        />
                        address.
                    </p>
                    <p className={'textRed'}>
                        If you burn the initial supply to create a misleading percentage of what the dev owns (for example giving the dev 10%, then burning 50% straight after, which means the 10% is actually 20%) and then claim on your website that you own the percentage displayed on bscscan (10% in the example), the token will be rejected.
                    </p>
                    <p>
                        If a token fails the requirements, it will not be approved and there will be no refund of the deposit fee. If unsure, email promotions@poocoin.app and ask in advance.
                    </p>
                </Card>
                <Card className={'Card1 mb3'}>
                    <span className={'fs5 fwBold'}>
                        Display your banner:
                    </span>
                    <p>
                        You must submit a website url and image to
                        <InLineLink
                            url="mailto://promotions@poocoin.app"
                            text=" promotions@poocoin.app "
                            fontSize="1rem"
                        />
                        or
                        <InLineLink
                            url="https://t.me/fomo11"
                            text=" @fomo11 "
                            fontSize="1rem"
                        />
                        with the dimensions 350px/100px and format jpg, png, or gif (can be animated). The displayed banner will be cycled each time the page is loaded.
                    </p>
                    <p>
                        The chance that your banner is displayed depends on your share of the top-10 pool that have banners. For example: if you have 30% of the pool share, your banner will be displayed 30% of the time the page is loaded.
                    </p>
                    <p>
                        You can also display your website and telegram links when your chart is being viewed.
                    </p>
                </Card>
                <div>
                    <p>
                        Due to the reflect token mechanics, these are the fees that will apply during a round trip of buying, depositing, and selling:
                    </p>
                    <table style={{ fontSize: ".875rem", maxWidth: "600px" }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th><br />Initial</th>
                                <th>Buy<br /> POOCOIN</th>
                                <th>Make LP<br /> Tokens</th>
                                <th>Deposit LP<br /> Tokens</th>
                                <th>Separate LP<br /> Tokens</th>
                                <th>Sell<br /> POOCOIN</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Fee</td>
                                <td></td>
                                <td>8%</td>
                                <td>8%</td>
                                <td>5%</td>
                                <td>16%</td>
                                <td>8%</td>
                            </tr>
                            <tr>
                                <td>Remaining</td>
                                <td>100%</td>
                                <td>92%</td>
                                <td>84.64%</td>
                                <td>80.41%</td>
                                <td>67.54%</td>
                                <td>62.14%</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        So if you bought $1000 worth of POOCOIN, created LP, deposited in pool, withdrew, then sold. You would receive $621 back.
                    </p>
                </div>
                <hr />
                <div>
                    <form>
                        <p>
                            Your LP balance: -
                        </p>
                        <p>
                            Your deposited LP balance: -
                        </p>
                        <div style={{ maxWidth: '500px' }}>
                            <div>
                                <label style={{ float: 'left', padding: '.5rem' }}>Deposit amount (POOCOIN/BNB LP) 5% deposit fee.</label>
                                <button className={'transButton'}>Max</button>
                            </div>
                            <OutlinedInput className={'CInput'} />
                        </div>
                        <p className={'textYellow'}>
                            Connect wallet to enable this form.
                            <br />
                        </p>
                        <Button variant="contained" className={classes.approve}>Approve</Button>
                    </form>
                </div>
                <p className={'textYellow'}>
                    The minimum amount for the list is $30,000 worth of POOCOIN/BNB LP
                </p>
                <p className={'textMuted'}>
                    Top 10 depositors of POOCOIN/BNB LP
                </p>
                <table className={'fs2 vettedTable'}>
                    <thead style={{ backgroundColor: '#f8f9fa', color: '#000' }}>
                        <tr>
                            <th>Rank</th>
                            <th>Promoted Address</th>
                        </tr>
                    </thead>
                    <VettedTable values={vettedData} />
                    {/* <tbody style={{ backgroundColor: '#000000' }}>
                        <tr>
                            <td align="right" style={{ verticalAlign: 'top', width: '20px' }}>1</td>
                            <td>
                                <a className={'linkText'} href="https://poocoin.app/tokens/0x580de58c1bd593a43dadcf0a739d504621817c05">
                                    THOREUM
                                    <br />
                                    <span className={'fs1 textMuted'}>Thoreum</span>
                                </a>
                                <br />
                                <span className={'fs1 textMuted'}>LP balance: 0.010212164847554959
                                    <br />
                                    LP value: $
                                    <span className={'textSuccess'}>$88,453.74</span>
                                </span>
                            </td>
                        </tr>
                    </tbody> */}
                </table>
                <hr />
                <p>Withdraw from V1 promotion pool.</p>
                <p>Your deposited LP balance: -</p>
                <p className={'textYellow'}>
                    Connect wallet to enable this form.
                    <br />
                </p>
                <Button variant="contained" className={classes.approve}>Withdraw All</Button>
            </Card>
        </div >
    )
}
