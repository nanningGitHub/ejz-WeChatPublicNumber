import React from "react";
import Utils from "../../../store/main/utils.js";
import style from "./css/icon.css";
import Icon from "./icon.jsx";

//导入方法

//导入组件样式

//导入子组件

export default class HistoryBack extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className={style.headerLeft} style={this.props.style}>
                {
                    this.props.onHandle ? (
                        <a onClick={() => this.props.onHandle()}>
                            <Icon width=".16rem" height=".5rem" backgroundImage="url(/mapp/image/icon_back.png)"/>
                        </a>
                    ) : (
                        <a onClick={() => {Utils.historyBack()}}>
                            <Icon width=".16rem" height=".5rem" backgroundImage="url(/mapp/image/icon_back.png)"/>
                        </a>
                    )
                }
            </section>
        )
    }
}