import React, { Component } from 'react';
import '../../css/advertise.css';
import InLineLink from '../../Component/InLineLink';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import bannerpreview from '../../Images/bannerpreview.png';

class Promotes extends Component {
    render() {
        return (
            <div>
                <Card className={'Card'}>
                    <CardHeader
                        title="Promote Token"
                    />
                    <hr />
                    <CardContent>
                        <p className={'fs5 fwBold'}>For pricing and purchasing of Promote tab:</p>
                        <hr />
                        <p className={'mt5 pt5'}>
                            Feel free to DM me for the cost of promotion. 
                        </p>
                        <hr />
                        <p>HamsterChart admin contact info:</p>
                        <p>
                            Email:
                            <InLineLink
                                url="mailto://promotions@hamsterchart.site"
                                text=" promotions@hamsterchart.site"
                                fontSize="1rem"
                            />
                        </p>
                        <p>
                            Telegram admin user:
                            <InLineLink
                                url="https://t.me/Deca_josh"
                                text=" @Deca_josh"
                                fontSize="1rem"
                            />
                        </p>
                        <p>
                            Telegram public chat:
                            <InLineLink
                                url="https://t.me/hamsterchart"
                                text=" https://t.me/hamsterchart"
                                fontSize="1rem"
                            />
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Promotes;