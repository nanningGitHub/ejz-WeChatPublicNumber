import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from "react-router";
import style from "./css/header.css";

//导入组件样式

export default class Header extends React.Component {
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
                        {
                            this.props.title ? (
                                <section className={style.middle}>
                                    <p>{this.props.title}</p>
                                </section>
                            ) : ("")
                        }
                    </section>
                )
            }
            </section>
        )
    }
}