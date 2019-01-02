import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History} from "react-router";
import ManageAction from "../../../store/main/manageAction.js";
import style from "./css/setting.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import Wrap from '../common/wrap.jsx'
import FooterForInfo from '../common/footer/footerForInfo.jsx'

export default class ChangePassWord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: JSON.parse(window.localStorage.user).phoneNumber
        }
    }

    _inputHandle = (e) => {
        this.setState({
            phoneNumber: e.target.value
        })
    }

    _clickHandle = () => {
        let phoneNumber = this.refs.phoneNumber.value;
        let nowPassword = this.refs.nowPassword.value;
        let newPassword = this.refs.newPassword.value;
        this.modifyPassword(phoneNumber,nowPassword,newPassword);
    }

    modifyPassword = (phoneNumber,nowPassword,newPassword) => {
        let self = this;
        ManageAction.modifyPassword(phoneNumber,nowPassword,newPassword,function (data) {
            self.props.history.pushState({state:data},'/mySetting');
        })
    }

    render() {
        return (
            <section>
                <Header title="修改密码">
                    <HistoryBack/>
                </Header>
                <section className="wrap">
                    <Wrap marginTop="0.16rem">
                        <section className={style.textArea} style={{marginTop: '.32rem'}}>
                            <p>当前账号：</p>
                            <input type="tel" value={this.state.phoneNumber} disabled="disabled" ref="phoneNumber" onChange={this._inputHandle.bind(this)}/>
                        </section>
                        <section className={style.textArea} style={{marginTop: '.18rem'}}>
                            <p>当前密码：</p>
                            <input type="password" ref="nowPassword"/>
                        </section>
                        <section className={style.textArea} style={{marginTop: '.18rem',marginBottom: '.72rem'}}>
                            <p>设置新密码：</p>
                            <input type="password" placeholder="请勿使用旧密码" ref="newPassword"/>
                        </section>
                    </Wrap>
                </section>
                <FooterForInfo>
                    <section className="submitButtonFooter">
                        <a onClick={() => {this._clickHandle()}}>保存</a>
                    </section>
                </FooterForInfo>
            </section>
        )
    }
}