import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History} from "react-router";
import Action from "../../../store/main/walletAction.js";
import style from "./css/wallet.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import Wrap from '../common/wrap.jsx'
import FooterForInfo from '../common/footer/footerForInfo.jsx'

export default class ChangeWalletPassword extends React.Component {
    constructor(props) {
        super(props)
    }

    _clickHandle = () => {
        let oldPW = this.refs.oldPW.value;
        let newPW = this.refs.newPW.value;
        let againNewPW = this.refs.againNewPW.value;
        this.modifyTXPassword(oldPW,newPW,againNewPW);
    }

    modifyTXPassword = (oldPW,newPW,againNewPW) => {
        Action.modifyTXPassword(oldPW,newPW,againNewPW,function (data) {
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

    render() {
        return (
            <section>
                <Header title="修改提现密码">
                    <HistoryBack order="1"/>
                </Header>
                <section className="wrap">
                    <Wrap marginTop="0.16rem">
                        <section className={style.textArea} style={{marginTop: '.32rem'}}>
                            <p>原始密码：</p>
                            <input type="password" ref="oldPW"/>
                        </section>
                        <section className={style.textArea} style={{marginTop: '.18rem'}}>
                            <p>新密码：</p>
                            <input type="password" ref="newPW"/>
                        </section>
                        <section className={style.textArea} style={{marginTop: '.18rem',marginBottom: '.72rem'}}>
                            <p>确认密码：</p>
                            <input type="password" ref="againNewPW"/>
                        </section>
                    </Wrap>
                </section>
                <FooterForInfo>
                    <section className="submitButtonFooter">
                        <a onClick={() => {this._clickHandle()}}>确认修改</a>
                    </section>
                </FooterForInfo>
            </section>
        )
    }
}