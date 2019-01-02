import React from "react";
import style from "./css/setting.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import HeaderContent from '../common/header/headerContent.jsx'
import Wrap from '../common/wrap.jsx'

export default class Feedback extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section>
                <Header title="意见反馈">
                    <HistoryBack/>
                    <HeaderContent title="发送"/>
                </Header>
                <section className="wrapWithHeader">
                    <Wrap marginTop="0.16rem">
                        <section className={style.textArea} style={{marginTop: '.18rem'}}>
                            <input type="text" placeholder="联系方式"/>
                        </section>
                        <section className={style.textArea} style={{marginTop: '.18rem',marginBottom: '.72rem'}}>
                            <textarea placeholder="填写反馈"></textarea>
                        </section>
                    </Wrap>
                </section>
            </section>
        )
    }
}