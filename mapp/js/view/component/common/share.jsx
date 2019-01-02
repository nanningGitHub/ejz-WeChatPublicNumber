import React from "react";
import style from "./css/icon.css";
import Icon from "./icon.jsx";

//导入组件样式

//导入子组件


export default class Share extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className={style.headerRight} style={{order: this.props.order}}>
                <a onClick={() => {Utils.historyBack()}}>
                    <Icon width=".48rem" height=".48rem" backgroundImage="url(/mapp/image/icon_share.png)"/>
                </a>
            </section>
        )
    }
}