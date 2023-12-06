import React from 'react';
import '../../css/advertise.css';
import { Alert } from '@material-ui/lab';
import { Card, CardHeader, OutlinedInput } from '@material-ui/core';

export default function UnVetted(props) {
    return (
        <div>
            <Alert className={'vettedAlert'} icon={false} severity="error">The history of all information entered here will be publicly visible on the chain.</Alert>
            <Card className={'Card mt3'}>
                <CardHeader title="Un-Vetted List" />
                <hr />
                <p>
                    The Un-Vetted list will place all new submissions to the top of the list, pushing the rest down. You can promote the same token as many times as you want, putting it back to the top of the list.
                </p>
                <p>
                    If your token is pushed off the top-10 most recent deposits, it will no longer be on the list and you will have to deposit again to get it back onto the top.
                </p>
                <p>
                    Place your token on the Un-Vetted list by depositing 20.0000 WBNB
                    <span style={{ color: '#28a745' }}> ($6,697.59) </span>
                    (You must wrap your regular BNB into WBNB on pancakeswap).
                    This is non-refundable and cant be withdrawn.
                </p>
                <div>
                    <form style={{ maxWidth: '500px' }}>
                        <div className={'mb3'}>
                            <label>
                                Token address
                                <br />
                                <small className={'textMuted fs2'}>
                                    Must be a valid Binance Smart Chain token address
                                </small>
                                <br />
                            </label>
                            <OutlinedInput className={'CInput'} />
                        </div>
                        <div className={'mb3'}>
                            <label>
                                Telegram url
                                <br />
                                <small className={'textMuted fs2'}>
                                    Must be a valid telegram group url starting with https://t.me/
                                </small>
                                <br />
                            </label>
                            <OutlinedInput className={'CInput'} />
                        </div>
                        <p>Your WBNB balance: -</p>
                        <p className={'textYellow'}>
                            Connect wallet to enable this form.
                            <br></br>
                            <small className={'textMuted fs2'}>
                                After depositing, you will need to refresh the browser to see your token on the high-risk list.
                            </small>
                        </p>
                    </form>
                </div>
            </Card>
        </div>
    )
}
