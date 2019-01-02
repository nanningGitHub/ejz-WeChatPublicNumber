import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History} from "react-router";
import Action from "../../../store/main/walletAction.js";
import style from "./css/wallet.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import Wrap from '../common/wrap.jsx'
import FooterForInfo from '../common/footer/footerForInfo.jsx'

export default class FindWalletPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            validateName: "获取验证码"
        }
    }

    _clickHandle = () => {
        let phoneNumber = this.refs.phoneNumber.value;
        let validateCode = this.refs.validateCode.value;
        let withdrawPW = this.refs.withdrawPW.value;
        this.findTXPassword(phoneNumber,validateCode,withdrawPW);
    }

    findTXPassword = (phoneNumber,validateCode,withdrawPW) => {
        Action.findTXPassword(phoneNumber,validateCode,withdrawPW,function (data) {
            if(data.updatePWStatus) {
                layer.open({
                    content: '提现密码修改成功',
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
            }
        })
    }

    sendFindTxPWSMS = () => {
        let self = this;
        let phoneNumber = this.refs.phoneNumber.value;
        Action.sendFindTxPWSMS(phoneNumber,function (data) {
            self.refs.validateCode.focus();
        })
    }

    render() {
        return (
            <section>
                <Header title="找回提现密码">
                    <HistoryBack order="1"/>
                </Header>
                <section className="wrap">
                    <Wrap marginTop="0.16rem">
                        <section className={style.textArea} style={{marginTop: '.32rem'}}>
                            <p>手机号：</p>
                            <input type="tel" ref="phoneNumber"/>
                        </section>
                        <section className={style.textAreaWithButton}>
                            <section className={style.textArea} style={{margin: '0',width:'4.22rem'}}>
                                <p>验证码：</p>
                                <input type="text" ref="validateCode" style={{width:'1.9rem'}}/>
                            </section>
                            <section>
                                <input type="button" value={this.state.validateName} className={style.validateButton} onClick={() => {this.sendFindTxPWSMS()}}/>
                            </section>
                        </section>
                        <section className={style.textArea} style={{marginTop: '.18rem',marginBottom: '.72rem'}}>
                            <p>新密码：</p>
                            <input type="password" ref="withdrawPW"/>
                        </section>
                    </Wrap>
                </section>
                <FooterForInfo>
                    <section className="submitButtonFooter">
                        <a onClick={() => {this._clickHandle()}}>提交</a>
                    </section>
                </FooterForInfo>
            </section>
        )
    }
}