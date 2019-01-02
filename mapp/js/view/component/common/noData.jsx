import React from "react";
import style from "./css/noData.css";

export default class NoData extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section>
                <section className={style.noDataImage}>
                    <img style={{width:"4.22rem",height:"3.6rem"}} src="/mapp/image/background_nodata.png"/>
                </section>
                <section className={style.noDataText}>
                    <p>暂无数据</p>
                </section>
            </section>
        )
    }
}