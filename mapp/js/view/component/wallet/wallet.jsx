import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History} from "react-router";
import Action from "../../../store/main/walletAction.js";
import style from "./css/wallet.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import HeaderContent from '../common/header/headerContent.jsx'
import Wrap from '../common/wrap.jsx';
import Entry from '../common/entry.jsx';
import Icon from '../common/icon.jsx';
import FooterForInfo from '../common/footer/footerForInfo.jsx';

export default class Wallet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayMoney: '',
            unbalanceMoney: '',
        }
    }

    componentWillMount = () => {
        this.getData();
    }

    getData = () => {
        let self = this;
        Action.getUserAmount(function (data) {
            self.setState({
                displayMoney: data.displayMoney,
                unbalanceMoney: data.unbalanceMoney
            })
        })
    }

    render() {
        const navList = [
            {title:"收支明细",imageUrl:"/mapp/image/icon_wallet_amount.png",toUrl:"/walletInfo"},
            {title:"账号绑定",imageUrl:"/mapp/image/icon_wallet_bind.png",toUrl:"/bindWallet"},
            {title:"提现密码修改",imageUrl:"/mapp/image/icon_wallet_changePassword.png",toUrl:"/changeWalletPassword"},
            {title:"提现密码找回",imageUrl:"/mapp/image/icon_wallet_findPassword.png",toUrl:"/findWalletPassword"}
        ];
        return (
            <section>
                <Header title="我的钱包">
                    <HistoryBack order="1"/>
                    <HeaderContent title="提现说明"/>
                </Header>
                <section className="wrap">
                    <section className={style.wrap}>
                        <section className={style.amountArea}>
                            <p className={style.amountDetail}>{this.state.displayMoney}</p>
                            <p className={style.amountDescription}>审核中金额（元）</p>
                            <section className={style.amountIcon}>
                                <Icon width=".4rem" height=".4rem" backgroundImage="url(/mapp/image/icon_wallet.png)"/>
                            </section>
                        </section>
                        <section>
                            <p className={style.myAmountDetail}>{this.state.unbalanceMoney}</p>
                            <p className={style.myAmountDescription}>可提现金额（元）</p>
                        </section>
                    </section>
                    <Wrap marginTop="0.16rem">
                        <Entry navList={navList}/>
                    </Wrap>
                </section>
                <FooterForInfo>
                    <section className="submitButtonFooter">
                        <a>提现</a>
                    </section>
                </FooterForInfo>
            </section>
        )
    }
}