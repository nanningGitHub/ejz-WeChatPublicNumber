import React from "react";
import style from "./css/confirm.css";

//导入组件样式

export default class Confirm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const props = this.props;
        return (
            <section className={style.confirmBackground}>
                <section className={style.confirmArea}>
                    <section className={style.confirmImage}>
                        <img src="/mapp/image/confirm.png"/>
                    </section>
                    <section className={style.confirmContent}>
                        <p>{props.content}</p>
                    </section>
                    <section className={style.confirmButtonArea}>
                        <a onClick={props.onLeftClick}>{props.leftBtn}</a>
                        <a onClick={props.onRightClick}>{props.rightBtn}</a>
                    </section>
                </section>
            </section>
        )
    }
}

Confirm.propTypes = {
    desc: React.PropTypes.string.isRequired,
    leftBtn: React.PropTypes.object,
    rightBtn: React.PropTypes.object.isRequired,
    onLeftClick: React.PropTypes.func,
    onRightClick: React.PropTypes.func.isRequired,
};