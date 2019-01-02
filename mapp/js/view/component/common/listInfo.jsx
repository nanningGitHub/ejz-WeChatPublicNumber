import React from "react";
import style from "./css/list.css";

//导入组件样式

export default class ListInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className={style.listInfo}>
                <p style={{color:this.props.color,fontSize:this.props.font}}>
                    <span style={{color:this.props.colorInfo}}> {this.props.info}</span>
                    {this.props.infoTitle}
                </p>
            </section>
        )
    }
}