import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History} from "react-router";
import Action from "../../../store/main/manageAction.js";
import style from "./css/manage.css";

import Header from '../common/header/header.jsx'
import HistroyBack from '../common/header/historyBack.jsx'
import Icon from '../common/icon.jsx'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    login = () => {
        self = this;
        let phoneNumber = this.refs.phone.value
        let password = this.refs.password.value
        Action.login(phoneNumber,password,function (data) {
            try {
                window.localStorage.setItem('token',data.token)
                window.localStorage.setItem('user',JSON.stringify(data.user))
            } catch (e) {
                layer.open({
                    content: '您处于无痕浏览，请选择正常模式登录',
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
                return false
            }
            setTimeout(function () {
                hashHistory.push('/user')
            },1000);
        })
    }

    render() {
        return (
            <section>
                <Header title="登录">
                    <HistroyBack/>
                </Header>
                <section className="wrapWithHeader">
                    <section className={style.loginArea}>
                        <section className={style.textArea}>
                            <section className={style.iconArea}>
                                <Icon width=".34rem" height=".34rem" backgroundImage="url(/mapp/image/icon_username.png)"/>
                            </section>
                            <input type="tel" placeholder="手机号码" className={style.text} ref="phone"/>
                        </section>
                        <section className={style.textArea} style={{marginTop: '.34rem'}}>
                            <section className={style.iconArea}>
                                <Icon width=".34rem" height=".34rem" backgroundImage="url(/mapp/image/icon_password.png)"/>
                            </section>
                            <input type="password" placeholder="密码" className={style.text} ref="password"/>
                        </section>
                        <section className={style.controll}>
                            <Link to="/forgetPassword">忘记密码</Link>
                            <Link to="/register">注册账号</Link>
                        </section>
                    </section>
                    <section className={style.loginButton} onClick={() => {this.login()}}></section>
                </section>
            </section>
        )
    }
}