import React from "react";
import style from "./css/contact.css";

import Header from '../common/header/header.jsx';
import HistoryBack from '../common/header/historyBack.jsx'
import Logo from '../common/logo.jsx';

export default class Contact extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount = () => {
        window.scrollTo(0,0);
    }

    render() {
        return (
            <section>
                <Header title="联系我们">
                    <HistoryBack/>
                </Header>
                <section className="wrapWithHeader">
                    <section className={style.contact}>
                        <Logo width="7.5rem" height="13.34rem" imageUrl="/mapp/image/contact_us.jpg"/>
                        <a href=""></a>
                    </section>
                </section>
            </section>
        )
    }
}