import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History} from "react-router";
import Action from "../../../store/main/manageAction.js";
import style from "./css/manage.css";

import Header from '../common/header/header.jsx'
import HistroyBack from '../common/header/historyBack.jsx'

export default class Register extends React.Component {
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

    onchangeHandle = (e) => {
        this.setState({
            checked: this.state.checked ? false : true,
        })
    }

    sendRegisterSMS = () => {
        let self = this;
        let phoneNumber = this.refs.phone.value
        Action.sendRegisterSMS(phoneNumber,function (data) {
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

    register = () => {
        let phoneNumber = this.refs.phone.value
        let password = this.refs.password.value
        let validateCode = this.refs.yzm.value
        let inviteCode = this.refs.yqm.value ? this.refs.yqm.value : ""
        Action.register(phoneNumber,password,validateCode,inviteCode,this.state.checked,function (data) {
            setTimeout(function() {
                Action.login(phoneNumber, password, function (loginData) {
                    window.localStorage.setItem('token', loginData.token)
                    window.localStorage.setItem('user', JSON.stringify(loginData.user))
                    setTimeout(function () {
                        hashHistory.push('/user')
                    },1000);
                })
            },2000)
        })
    }

    render() {
        return (
            <section>
                <Header title="注册">
                    <HistroyBack/>
                </Header>
                <section className="wrapWithHeader">
                    <section className={style.registerArea}>
                        <section className={style.textArea}>
                            <input type="tel" placeholder="手机号码" className={style.text} ref="phone"/>
                        </section>
                        <section className={style.column}>
                            <section className={style.textArea} style={{width: '3.1rem',margin: '0'}}>
                                <input type="number" placeholder="请输入验证码" className={style.text} ref="yzm"/>
                            </section>
                            <input type="button" className={style.yzmButton} style={this.state.buttonStyle} disabled={this.state.disable} onClick={() => {this.sendRegisterSMS()}} value={this.state.buttonValue}/>
                        </section>
                        <section className={style.textArea} style={{marginTop: '.26rem'}}>
                            <input type="password" placeholder="密码（6-16位数字或字母）" className={style.text} ref="password"/>
                        </section>
                        <section className={style.textArea} style={{marginTop: '.26rem'}}>
                            <input type="text" placeholder="请输入邀请码（选填）" className={style.text} ref="yqm"/>
                        </section>
                        <section className={style.controll} style={{marginTop: '.31rem'}}>
                            <a>收不到验证码？尝试用语音接收验证码</a>
                        </section>
                        <section className={style.agreement}>
                            <section className={style.agreementArea}>
                                <label htmlFor="agree">
                                    {
                                        this.state.checked ? (
                                            <img style={{width:'.22rem',height:'.22rem'}} src="/mapp/image/icon_checked.png"/>
                                        ) : (
                                            <img style={{width:'.22rem',height:'.22rem'}} src="/mapp/image/icon_checked_false.png"/>
                                        )
                                    }
                                    <input type="checkbox" id="agree" checked={this.state.checked} style={{display:"none"}} onChange={this.onchangeHandle.bind(this)}/>
                                </label>
                                <p>我已阅读并同意<a>《用户协议》</a></p>
                            </section>
                        </section>
                    </section>
                    <section className={style.registerButton} onClick={() => {this.register()}}></section>
                </section>
            </section>
        )
    }
}