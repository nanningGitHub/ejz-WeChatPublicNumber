 import React from "react";
 import style from "./css/welfare.css";
 import Icon from "./icon.jsx";

 //导入组件样式

 //导入子组件

 export default class Welfare extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className={style.welfare}>
                <Icon width=".56rem" height=".34rem" backgroundImage={this.props.backgroundImage}/>
                <p>{this.props.title}</p>
            </section>
        )
    }
}