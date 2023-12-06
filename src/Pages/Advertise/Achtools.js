
import React, { Component } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import InLineLink from '../../Component/InLineLink';
import '../../css/advertise.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, OutlinedInput, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    connect: {
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: '500',
        color: theme.palette.common.white,
        backgroundColor: '#53CA42',
    },
}));

export default function Achtools() {
    const [state, setState] = React.useState({
        tokenAddress: '',
        router: 10,
        telegram: '',
        webSite: '',
        medium: '',
        reddit: '',
        twitter: '',
        other: '',
    });
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    const classes = useStyles();

    const handleSubmit = (event) => {
        console.log(state);
    };
    return (
        <div className={'mt3'}>
            <Card className={'Card'}>
                <CardHeader className={'mb3'} title="AchTools Price Bot" />
                <span className={'fs5'}>
                    Free version
                </span>
                <p>
                    Complete this form to receive a free telegram price bot.
                </p>
                <p>How To Add Bot To Room</p>
                <p>🚪 go to your channel/group</p>
                <p>👆 click on the 3 dots in the corner</p>
                <p>💬 click add users/members</p>
                <p>🤖 type in @CustomPriceBot</p>
                <p>👮 make sure to set it as admin</p>
                <form className={'mb3'} style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
                    <div className={'fwBold'}>
                        Details (required)
                    </div>
                    <hr />
                    <div className={'mb2'}>
                        <label>Token Address*</label>
                        <OutlinedInput value={state.tokenAddress} name="tokenAddress" onChange={handleChange} className={'CInput'} autoComplete="off" />
                    </div>
                    <div className={'mb2'}>
                        <label>Router*</label>
                        <FormControl variant="outlined" className={'CSelect'}>
                            <Select
                                native
                                value={state.router}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'router',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option value={10}>Pancake V1</option>
                                <option value={20}>Pancake V2</option>
                                <option value={30}>BakerySwap</option>
                                <option value={40}>UniSwap V2</option>
                                <option value={50}>QuickSwap</option>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={'mb2'}>
                        <label>Telegram*</label>
                        <OutlinedInput value={state.telegram} name="telegram" onChange={handleChange} autoComplete="off" className={'CInput'} />
                    </div>
                    <div className={'fwBold'}>
                        Links (optional)
                    </div>
                    <hr />
                    <div className={'mb2'}>
                        <label>Website</label>
                        <OutlinedInput value={state.webSite} name="webSite" onChange={handleChange} autoComplete="off" className={'CInput'} />
                    </div>
                    <div className={'mb2'}>
                        <label>Medium</label>
                        <OutlinedInput value={state.medium} name="medium" onChange={handleChange} autoComplete="off" className={'CInput'} />
                    </div>
                    <div className={'mb2'}>
                        <label>Reddit</label>
                        <OutlinedInput value={state.reddit} name="reddit" onChange={handleChange} autoComplete="off" className={'CInput'} />
                    </div>
                    <div className={'mb2'}>
                        <label>Twitter</label>
                        <OutlinedInput value={state.twitter} name="twitter" onChange={handleChange} autoComplete="off" className={'CInput'} />
                    </div>
                    <div className={'mb2'}>
                        <label>Other</label>
                        <OutlinedInput value={state.other} name="other" onChange={handleChange} autoComplete="off" className={'CInput'} />
                    </div>
                    <Button type="submit" variant="contained" className={classes.connect}>Create Free Bot</Button>
                </form>
                <span className={'fs5'}>
                    Paid version
                </span>
                <p>
                    Contact
                    <InLineLink
                        url="https://t.me/dasilva333"
                        text=" @dasilva333 "
                        fontSize="1rem"
                    />
                    on Telegram for the paid version of the price bot.
                </p>
            </Card>
        </div>
    )
}
