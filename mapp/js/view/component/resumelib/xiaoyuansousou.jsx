import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from "react-router";
import style from "./css/xiaoyuansousou.css";
import Header from "../common/header.jsx";
import HistoryBack from "../common/historyBack.jsx";
import Logo from "../common/logo.jsx";

export default class XiaoYuanSouSou extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section>
                <Header title="校园搜搜">
                    <HistoryBack/>
                </Header>
                <section className="wrapWithHeader">
                    <section className={style.content}>
                        <Logo width="100%" height="1671px" imageUrl="/mapp/image/xiaoyuansousouOne.jpg"/>
                    </section>
                </section>
                <Link to="/resumeList">
                <section className={style.wrap}>
                        <section className={style.wrapFont}>
                            去搜搜
                        </section>
                </section>
                </Link>
            </section>
        )
    }
}