import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History} from "react-router";
import Action from "../../../store/main/walletAction.js";
import style from "./css/wallet.css";

import Header from '../common/header/header.jsx';
import HistoryBack from '../common/header/historyBack.jsx';
import Confirm from '../common/confirm.jsx';
import Shadow from '../common/shadow.jsx';
import Wrap from '../common/wrap.jsx';
import FooterForInfo from '../common/footer/footerForInfo.jsx';

export default class BindWallet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            alipayUsername: "",
            alipayAccount: "",
            confirmStatus: false,
            passwordStatus: false,
        }
    }

    componentWillMount = () => {
        this.isBinding();
    }

    _clickHandle = () => {
        let alipayUsername = this.refs.alipayUsername.value;
        let alipayAccount = this.refs.alipayAccount.value;
        let againAlipayAccount = this.refs.againAlipayAccount.value;
        this.binding(alipayUsername,alipayAccount,againAlipayAccount);
    }

    isBinding = () => {
        let self = this;
        Action.isBinding(function (data) {
            self.setState({
                alipayUsername: data.alipayAccount,
                alipayAccount: data.alipayUsername,
            })
        })
    }

    binding = (alipayUsername,alipayAccount,againAlipayAccount) => {
        let self = this;
        Action.binding(alipayUsername,alipayAccount,againAlipayAccount,function (data) {
            self.setState({
                bindStatus: data.updateStatu,
            },function () {
                if(self.state.bindStatus){
                    self.setState({
                        alipayUsername: alipayUsername,
                        alipayAccount: alipayAccount
                    })
                }
            })
        })
    }

    delBinding = (password) => {
        let self = this;
        Action.delBinding(password,function (data) {
            self.setState({
                bindStatus: false,
                confirmStatus: false,
                passwordStatus: false,
                alipayUsername: '',
                alipayAccount: ''
            })
        })
    }

    delConfirm = () => {
        this.setState({
            confirmStatus: true
        })
    }

    closeConfirm = () => {
        this.setState({
            confirmStatus: false
        })
    }

    enterConfirm = () => {
        this.setState({
            confirmStatus: false,
            passwordStatus: true,

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
        if(pw.length == 6){
            this.delBinding(pw);
        }
    }

    shadowHandle = () => {
        this.setState({
            passwordStatus: false
        })
    }

    render() {
        const confirm = {
            content: '删除支付宝账号后您将无法提现，您确定删除吗？',
            leftBtn: '取消',
            rightBtn: '确认'
        };
        return (
            <section>
                {
                    this.state.confirmStatus ? (
                        <Confirm {...confirm} onLeftClick={this.closeConfirm.bind(this)} onRightClick={this.enterConfirm.bind(this)}/>
                    ) : ('')
                }
                {
                    this.state.passwordStatus ? (
                        <section>
                            <Shadow zIndex="200" shadowHandle={this.shadowHandle}/>
                            <section className="wrap" style={{position:'absolute',zIndex:'201',left:'50%',marginLeft:'-3.63rem'}}>
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
                        </section>
                    ) : ('')
                }
                <Header title="账号绑定">
                    <HistoryBack order="1"/>
                </Header>
                {
                    this.state.alipayUsername ? (
                        <section className="wrap">
                            <Wrap marginTop="0.16rem">
                                <section className={style.bindArea} onClick={() => {this.delConfirm()}}>
                                    <img src="/mapp/image/alipay.png"/>
                                    <section className={style.bindContent}>
                                        <p className={style.bindName}>{this.state.alipayUsername}</p>
                                        <p className={style.bindAccount}>{this.state.alipayAccount}</p>
                                    </section>
                                </section>
                            </Wrap>
                        </section>
                    ) : (
                        <section>
                            <section className="wrap">
                                <Wrap marginTop="0.16rem">
                                    <section className={style.textArea} style={{marginTop: '.32rem'}}>
                                        <p>账户姓名：</p>
                                        <input type="text" ref="alipayUsername"/>
                                    </section>
                                    <section className={style.textArea} style={{marginTop: '.18rem'}}>
                                        <p>支付宝账户：</p>
                                        <input type="password" ref="alipayAccount"/>
                                    </section>
                                    <section className={style.textArea} style={{marginTop: '.18rem',marginBottom: '.72rem'}}>
                                        <p>确认账户：</p>
                                        <input type="password" ref="againAlipayAccount"/>
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
            </section>
        )
    }
}