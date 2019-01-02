import React from "react";
import style from "./css/scrollItem.css";

//导入组件样式

export default class ScrollItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <a className={style.item}>
                <img src="" className={style.image}/>
                <section className={style.textArea}>
                    <h3 className={style.title}>FOXHOLE</h3>
                    <p className={style.description}>编辑</p>
                    <section>
                        <p className={style.salary}>25</p>
                        <p className={style.salaryInfo}>RMB/</p>
                    </section>
                </section>
            </a>
        )
    }
}