import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History} from "react-router";
import Utils from "../../../store/main/utils.js";
import style from "./css/success.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import Wrap from '../common/wrap.jsx'
import Icon from '../common/icon.jsx'
import Ellipse from '../common/ellipse.jsx'

export default class OfflineSuccess extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ellipse: {
                margin: '0 auto .26rem',
                padding: '0',
                width: '6rem',
                height: '.88rem',
                lineHeight: '.88rem',
                fontSize: '.32rem',
                color: '#37d3cb',
                border: '1px solid #37d3cb'
            },
            ellipseBottom: {
                margin: '0 auto .38rem',
                padding: '0',
                width: '6rem',
                height: '.88rem',
                lineHeight: '.88rem',
                fontSize: '.32rem',
                color: '#37d3cb',
                border: '1px solid #37d3cb'
            }
        }
    }

    historyBack = () => {
        hashHistory.push('/jobOffline');
    }

    render() {
        return (
            <section>
                <Header title="提交成功" flex="flex-start">
                    <HistoryBack/>
                </Header>
                <section className="wrapWithHeader">
                    <Wrap marginTop="0.16rem">
                        <section className={style.iconArea}>
                            <Icon width="1.8rem" height="1.8rem" backgroundImage="url(/mapp/image/icon_success.png)"/>
                        </section>
                        <section style={{marginBottom: '1.03rem'}} className={style.successText}>
                            <p>分享后可抽取iphone6s Plus</p>
                        </section>
                        <section>
                            <Ellipse name="分享" style={this.state.ellipse}/>
                            <Ellipse name="查看兼职轨迹" style={this.state.ellipse}/>
                            <Ellipse name="返回" style={this.state.ellipseBottom} todo={Utils.historyBack}/>
                        </section>
                    </Wrap>
                </section>
            </section>
        )
    }
}