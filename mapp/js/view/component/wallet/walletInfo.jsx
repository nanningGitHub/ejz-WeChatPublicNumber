import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History} from "react-router";
import Action from "../../../store/main/walletAction.js";
import style from "./css/wallet.css";
import Header from "../common/header.jsx";
import HistoryBack from "../common/historyBack.jsx";
import Wrap from "../common/wrap.jsx";

export default class WalletInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            getUserAccountRecord: [],
        }
    }

    componentWillMount = () => {
        if(window.localStorage.token){
            this.getUserAccountRecord();
        }else{
            history.push("/login")
        }
    }

    getUserAccountRecord = () => {
        let self = this;
        Action.getUserAccountRecord(function (data) {
            self.setState({
                getUserAccountRecord: data.getUserAccountRecord
            })
        })
    }

    render() {
        return (
            <section>
                <Header title="收支明细">
                    <HistoryBack order="1"/>
                </Header>
                <section className="wrapWithHeader">
                    {
                        this.state.getUserAccountRecord.map((userAccountRecordList,i) => {
                            return(
                                <Wrap marginTop="0.16rem" key={i}>
                                    <section className={style.walletInfoArea}>
                                        <section className={style.walletInfoDetail}>
                                            <section className={style.walletInfoTitle}>
                                                <h3>{userAccountRecordList.title}</h3>
                                            </section>
                                            <section className={style.walletInfoDate}>
                                                <p>{userAccountRecordList.createdDateStr}</p>
                                            </section>
                                        </section>
                                        <section className={style.walletInfoDetailSecond}>
                                            <section className={style.walletInfoSubTitle}>
                                                <p>{userAccountRecordList.subTitle}</p>
                                            </section>
                                            <section className={style.walletInfoMoney}>
                                                <p>{userAccountRecordList.money}</p>
                                            </section>
                                        </section>
                                    </section>
                                </Wrap>
                            )
                        })
                    }
                </section>
            </section>
        )
    }
}