import React from "react";
import style from "./css/onlineMoney.css";
import Wrap from "../common/wrap.jsx";

//导入组件样式

//导入子组件

export default class OnlineMoney extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Wrap marginTop="2px">
                <section className={style.money}>
                    <p>完成下面任务可得<span>{this.props.totalPrice}</span>元</p>
                </section>
            </Wrap>
        )
    }
}