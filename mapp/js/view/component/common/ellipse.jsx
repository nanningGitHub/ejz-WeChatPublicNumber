import React from "react";
import style from "./css/ellipse.css";

//导入组件样式

export default class Ellipse extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className={style.ellipse} style={this.props.style} onClick={() => {this.props.todo()}}>
                {this.props.name}
            </section>
        )
    }
}