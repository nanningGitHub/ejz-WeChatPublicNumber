import React from "react";
import Action from "../../../store/main/manageAction.js";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History} from "react-router";
import style from "./css/manage.css";

import Header from '../common/header/header.jsx'
import HistroyBack from '../common/header/historyBack.jsx'

export default class ForgetPassword extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            buttonValue: "获取验证码",
            buttonStyle: {
                backgroundColor: "#fec23b"
            },
            disable: false,
            time: 60,
            checked: true
        }
    }

    sendFindBackSMS = () => {
        let self = this;
        let phoneNumber = this.refs.phone.value
        Action.sendFindBackSMS(phoneNumber,function (data) {
            self.setState({
                buttonValue: self.state.time + "秒重新获取",
                buttonStyle: {
                    backgroundColor: "#bbbbbb"
                },
                disable: true
            })
            let countDown = setInterval(self.countDown,1000);
            setTimeout(function () {
                window.clearInterval(countDown)
                self.setState({
                    buttonValue: "获取验证码",
                    buttonStyle: {
                        backgroundColor: "#fec23b"
                    },
                    disable: false,
                    time: 60
                })
            },62000)
        })
    }

    countDown = () => {
        this.setState({
            time: this.state.time - 1,
            buttonValue: this.state.time + "秒重新获取",
        })
    }

    findPassword = () => {
        let phoneNumber = this.refs.phone.value
        let password = this.refs.password.value
        let validateCode = this.refs.yzm.value
        Action.findPassword(phoneNumber,validateCode,password,function (data) {
            hashHistory.push('/user')
        })
    }

    render()
    {
        return (
            <section>
                <Header title="找回密码">
                    <HistroyBack/>
                </Header>
                <section className="wrapWithHeader">
                    <section className={style.passwordArea}>
                        <section className={style.textArea}>
                            <input type="tel" placeholder="请输入手机号码" className={style.text} ref="phone"/>
                        </section>
                        <section className={style.column}>
                            <section className={style.textArea} style={{width: '3.1rem',margin: '0'}}>
                                <input type="tel" placeholder="请输入验证码" className={style.text} ref="yzm"/>
                            </section>
                            <input type="button" className={style.yzmButton} style={this.state.buttonStyle} disabled={this.state.disable} onClick={() => {this.sendFindBackSMS()}} value={this.state.buttonValue}/>
                        </section>
                        <section className={style.textArea} style={{marginTop: '.26rem'}}>
                            <input type="password" placeholder="密码（6-16位数字或字母）" className={style.text} ref="password"/>
                        </section>
                    </section>
                    <section className={style.registerButton} onClick={() => {this.findPassword() }}></section>
                </section>
            </section>
        )
    }
}