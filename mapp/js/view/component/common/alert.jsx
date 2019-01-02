import React from "react";
import style from "./css/eject.css";
import Shadow from "./shadow.jsx";
import Icon from "./icon.jsx";

//导入组件样式

//导入子组件

export default class Alert extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            alertStyle: {
                marginTop: - (1 * 3 / 2) + 'rem',
            }
        }
    }

    render(){
        return(
            <section>
                <Shadow/>
                <section style={this.state.alertStyle} className={style.alertArea}>
                    <section className={style.alert}>
                        <a className={style.alertItem}>联系商家</a>
                        <a className={style.alertItem}>联系商家</a>
                        <a className={style.alertItem}>联系商家</a>
                    </section>
                    <a className={style.close}>
                        <Icon width=".88rem" height=".88rem" backgroundImage="url(/mapp/image/close.png)"/>
                    </a>
                </section>
            </section>
        )
    }
}