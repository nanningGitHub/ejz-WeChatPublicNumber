import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from "react-router";
import style from "./css/list.css";
import Icon from "../common/icon.jsx";
// 引入React-Router模块

//导入组件样式

//导入子组件

export default class List extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section>
                {
                    this.props.href ? (
                        <Link to={this.props.href}>
                            {
                                this.props.listBorder ? (
                                    <section className={style.wrapWithBorder}>
                                        <p className={style.title}>{this.props.title}</p>
                                        {this.props.children}
                                        {
                                            this.props.style == "1" ? (
                                                ""
                                            ) : (
                                                <section className={style.goIcon}>
                                                    <Icon width=".14rem" height=".36rem" backgroundImage="url(/mapp/image/icon_go.png)"/>
                                                </section>
                                            )
                                        }
                                    </section>
                                ) : (
                                    <section className={style.wrap}>
                                        <p className={style.title}>{this.props.title}</p>
                                        {this.props.children}
                                        {
                                            this.props.style == "1" ? (
                                                ""
                                            ) : (
                                                <section className={style.goIcon}>
                                                    <Icon width=".14rem" height=".36rem" backgroundImage="url(/mapp/image/icon_go.png)"/>
                                                </section>
                                            )
                                        }
                                    </section>
                                )
                            }
                        </Link>
                    ) : (
                        <section>
                        {
                            this.props.listBorder ? (
                                <section className={style.wrapWithBorder}>
                                    <p className={style.title}>{this.props.title}</p>
                                    {this.props.children}
                                    {
                                        this.props.style == "1" ? (
                                            ""
                                        ) : (
                                            <section className={style.goIcon}>
                                                <Icon width=".14rem" height=".36rem" backgroundImage="url(/mapp/image/icon_go.png)"/>
                                            </section>
                                        )
                                    }
                                </section>
                            ) : (
                                <section className={style.wrap}>
                                    <p className={style.title}>{this.props.title}</p>
                                    {this.props.children}
                                    {
                                        this.props.style == "1" ? (
                                            ""
                                        ) : (
                                            <section className={style.goIcon}>
                                                <Icon width=".14rem" height=".36rem" backgroundImage="url(/mapp/image/icon_go.png)"/>
                                            </section>
                                        )
                                    }
                                </section>
                            )
                        }
                    </section>
                    )
                }
            </section>
        )
    }
}