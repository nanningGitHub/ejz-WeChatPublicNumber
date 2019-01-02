import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from "react-router";
import style from "./css/header.css";

//导入组件样式

export default class ResumeHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section>
            {
                this.props.template == 'search' ? (
                    <section className={style.wrap} style={{justifyContent: this.props.flex}}>
                        {this.props.children}
                    </section>
                ) : (
                    <section className={style.wrap} style={{justifyContent: this.props.flex}}>
                        {this.props.children}
                        <section className={style.middle}>
                            <p>校园搜搜</p>
                            <p>购买套餐</p>
                        </section>
                    </section>
                )
            }
            </section>
        )
    }
}