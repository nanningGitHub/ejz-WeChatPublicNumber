import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History} from "react-router";
import Action from "../../../store/main/walletAction.js";
import style from "./css/wallet.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import Wrap from '../common/wrap.jsx'
import FooterForInfo from '../common/footer/footerForInfo.jsx'

export default class SetWalletPassword extends React.Component {
    constructor(props) {
        super(props)
    }

    _clickHandle = () => {
        let password = this.refs.password.value;
        this.withdrawal(password);
    }

    withdrawal = (password) => {
        let self = this;
        Action.withdrawal(password,function (data) {
            if(data.withdrawalStatus == 1) {
                layer.open({
                    content: '设置提现密码成功',
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
                window.localStorage.setItem('ishaveTxPw',0)
            }else{
                layer.open({
                    content: '设置提现密码失败',
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
            }
        })
    }

    changeHandle = () => {
        let numLen = 6;
        let pw = $('input').val();
        let list = $('li');
        for(let i=0; i<numLen; i++){
            if(pw[i]){
                $(list[i]).text('*');
            }else{
                $(list[i]).text('');
            }
        }
    }

    render() {
        return (
            <section>
                <Header title="设置提现密码">
                    <HistoryBack order="1"/>
                </Header>
                <section className="wrap">
                    <Wrap marginTop="0.16rem">
                        <section className={style.setPasswordArea}>
                            <p>提现密码：</p>
                            <label htmlFor="ipt" className={style.setPasswordLabel}>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </label>
                            <input type="tel" id="ipt" ref="password" maxLength="6" className={style.setPasswordInput} onChange={() => {this.changeHandle()}}/>
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