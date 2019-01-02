import React from "react";
import style from "./css/shadow.css";

//导入组件样式

export default class Shadow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className={style.shadow} style={{zIndex: this.props.zIndex}} onClick={() => {this.props.shadowHandle()}}>
                {this.props.children}
            </section>
        )
    }
}