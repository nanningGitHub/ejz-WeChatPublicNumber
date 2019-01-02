import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from "react-router";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import Wrap from '../common/wrap.jsx'
import List from '../common/list.jsx'
import ListInfo from '../common/listInfo.jsx'

export default class Setting extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount = () => {
        let temp = this.props.location.state ? this.props.location.state : '';
        if(temp){
            layer.open({
                content: '修改密码成功',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
        }
    }

    loginOut = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        hashHistory.push('/user');
    }

    historyBack = () => {
        hashHistory.push('/user');
    }

    render() {
        return (
            <section>
                <Header title="系统设置">
                    <HistoryBack onHandle={this.historyBack}/>
                </Header>
                <section className="wrapWithHeader">
                    <Wrap marginTop="0.16rem">
                        <List title="服务中心" listBorder="true"/>
                        <List title="意见反馈" listBorder="true" href="/mySetting/feedback"/>
                        <List title="清除缓存" listBorder="true"/>
                        <List title="关于我们" listBorder="true"/>
                        <List title="修改密码" listBorder="true" href="/mySetting/changePassword"/>
                        <List title="版本更新">
                            <ListInfo infoTitle="3.6.6" color="#37d3cb"/>
                        </List>
                    </Wrap>
                    <section className="submitButton">
                        <a onClick={() => {this.loginOut()}}>退出当前账号</a>
                    </section>
                </section>
            </section>
        )
    }
}