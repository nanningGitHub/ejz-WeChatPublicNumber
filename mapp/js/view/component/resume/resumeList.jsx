import React from "react";
import style from "./css/resume.css";
import Icon from "../common/icon.jsx";

//导入组件样式

//导入子组件


export default class ResumeList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className={style.resumeArea} style={{borderBottom: this.props.border}}>
                <section className={style.resumeLeft}>
                    <p className={style.needed}>
                        {
                            this.props.needed ? '*' : ''
                        }
                    </p>
                    <p className={style.inputName}>{this.props.name}</p>
                </section>
                {this.props.children}
                {
                    this.props.icon ? (
                        <section className={style.goIcon}>
                            <Icon width=".14rem" height=".36rem" backgroundImage="url(/mapp/image/icon_go.png)"/>
                        </section>
                    ) : ''
                }
            </section>
        )
    }
}