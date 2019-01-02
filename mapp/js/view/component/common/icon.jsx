import React from "react";
import style from "./css/icon.css";

//导入组件样式

export default class Icon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            iconStyle: {
                width: this.props.width,
                height: this.props.height,
                backgroundImage: this.props.backgroundImage
            }
        }
    }

    render() {
        return (
            <span style={this.state.iconStyle} className={style.icon}></span>
        )
    }
}