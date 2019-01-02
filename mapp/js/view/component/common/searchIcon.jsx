import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from "react-router";
import style from "./css/icon.css";
import Icon from "./icon.jsx";

//导入组件样式

//导入子组件

export default class SearchIcon extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className={style.headerRight} style={{order: this.props.order}}>
                {
                    this.props.template == 'searchJianliku' ? (
                        <Link to="/searchJianliku">
                            <Icon width=".5rem" height=".5rem" backgroundImage="url(/mapp/image/search.png)"/>
                        </Link>
                        ) : (
                        <Link to="/search">
                            <Icon width=".5rem" height=".5rem" backgroundImage="url(/mapp/image/search.png)"/>
                        </Link>
                    )
                }
            </section>
        )
    }
}