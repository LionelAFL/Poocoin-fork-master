import React, { Component } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import InLineLink from '../../Component/InLineLink';
import '../../css/advertise.css';
import poocoinpricebot from '../../Images/hamsterpricebot.jpg';
class Poocoin extends Component {
    render() {
        return (
            <div className={'mt3'}>
                <Card className={'Card'}>
                    <CardHeader title="Hamster Free Price Bot" />
                    <span className={'fs5'}>
                        Invite the bot
                    </span>
                    <p>
                        You can add this pricebot for free to your telegram group by adding
                        <InLineLink
                            url="https://t.me/Hamster_Pricebot"
                            text=" @Hamster_Pricebot "
                            fontSize="1rem"
                        />
                        to your group.
                    </p>
                    <span className={'fs5'}>
                        Set the token
                    </span>
                    <p>
                        Set the tracked token with the command /set_token {'{address}'}
                    </p>
                    <p>
                        For example, to set the hamster token type: /set_token 0xb27adaffb9fea1801459a1a81b17218288c097cc
                    </p>
                    <span className={'fs5'}>
                        Request the price and chart
                    </span>
                    <p>
                        Anyone in the group can request the price chart by typing /price
                    </p>
                    <span className={'fs5'}>
                        Set additional text
                    </span>
                    <p>
                        You can set additional text at the end of each price response with /set_message {'{text}'}
                    </p>
                    <p>
                        You can set links inside the message with the HTML {'<a>'} tag. For example, in the preview below it has been used to set the social media links.
                    </p>
                    <div>
                        <img src={poocoinpricebot} width="400" />
                    </div>
                </Card>
            </div>
        )
    }
}

export default Poocoin;