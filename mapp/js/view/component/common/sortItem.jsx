import React from "react";
import style from "./css/sort.css";

//导入组件样式

export default class SortItem extends React.Component {
    constructor(props) {
        super(props)
    }

    choose = () => {
        let self = this;
        this.props.clickHandle(this.props.type,function () {
            self.refs.icon.style.backgroundImage = "";
        },function () {
            self.refs.icon.style.backgroundImage = "url(/mapp/image/icon_up.png)";
        });
    }

    render() {
        return (
            <a className={style.sortItem} onClick={this.choose}>
                {
                    this.props.sort ? (
                        this.props.sort == 'first' ? (
                            <section className={style.sortItemBorderFirst}></section>
                        ) : (
                            <section className={style.sortItemBorderLast}></section>
                        )
                    ) : (
                        <section className={style.sortItemBorderBoth}></section>
                    )
                }
                <section className={style.sortArea}>
                    <p className={style.sortName}>{this.props.typeName}</p>
                    <section className={style.sortIcon} ref="icon"></section>
                </section>
            </a>
        )
    }
}