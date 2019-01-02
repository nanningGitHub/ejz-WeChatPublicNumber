import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History} from "react-router";
import OfflineAction from "../../../store/main/offlineAction.js";
import MyJobAction from "../../../store/main/myJobAction.js";
import style from "./css/info.css";

import Header from '../common/header/header.jsx';
import HistoryBack from '../common/header/historyBack.jsx';
import Wrap from '../common/wrap.jsx';
import Icon from '../common/icon.jsx';

export default class WorkRecordInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobOffline: [],
            workRecord: {},
        }
        this.jobId = "";
        this.jobRequestId = "";
    }

    componentWillMount = () => {
        this.jobId = this.props.location.query.jobId;
        this.jobRequestId = this.props.location.query.jobRequestId;
        this.getSingle(this.jobId);
        this.getWorkRecord(this.jobRequestId,this.jobId);
    }

    getSingle = (jobId) => {
        let self = this;
        OfflineAction.getSingle(jobId,function (data) {
            self.setState({
                jobOffline: data.jobOffline
            })
        })
    }

    getWorkRecord = (jobRequestId,jobId) => {
        let self = this;
        MyJobAction.getWorkRecord(jobRequestId,jobId,function (data) {
            self.setState({
                workRecord: data
            })
        })
    }

    render() {
        return (
            <section>
                <Header title="上岗记录">
                    <HistoryBack order="1"/>
                </Header>
                <section className="wrap">
                    <Wrap marginTop=".16rem">
                        <Link to={{ pathname: "/companyInfo/:" + this.state.jobOffline.enterpriseId,query: { articleID: this.state.jobOffline.enterpriseId }}}>
                            <section className={style.workRecordJobArea}>
                                <section className={style.workRecordJobLogo}>
                                    <img src={this.state.jobOffline.bigImageUrl}/>
                                </section>
                                <section className={style.workRecordJobTextArea}>
                                    <section className={style.workRecordJobTitleArea}>
                                        <h3>{this.state.jobOffline.title}</h3>
                                    </section>
                                    <section className={style.workRecordJobDescriptionArea}>
                                        <section className={style.workRecordJobDate}>
                                            <p>2016-05-24</p>
                                        </section>
                                        {
                                            this.state.jobOffline.salaryUnitStr == "面议" ? (
                                                <section className={style.workRecordJobSalaryArea}>
                                                    <p className={style.workRecordJobSalary}>{this.state.jobOffline.salaryUnitStr}</p>
                                                </section>
                                            ) :(
                                                <section className={style.workRecordJobSalaryArea}>
                                                    <p className={style.workRecordJobSalary}>{this.state.jobOffline.salaryStr}</p>
                                                    <p className={style.workRecordJobSalaryUnit}>RMB/{this.state.jobOffline.salaryUnitStr}</p>
                                                </section>
                                            )
                                        }
                                    </section>
                                </section>
                            </section>
                        </Link>
                    </Wrap>
                    <Wrap marginTop=".16rem">
                        <section className={style.wordRecordStatusArea}>
                            <section className={style.wordRecordStatusTitleArea}>
                                <section className={style.wordRecordStatusPoint}>
                                    <Icon width=".16rem" height=".16rem" backgroundImage="url(/mapp/image/icon_record_point.png)"/>
                                </section>
                                <section className={style.wordRecordStatusTitle}>
                                    <h3>兼职轨迹</h3>
                                </section>
                            </section>
                            <section className={style.wordRecordStatusLogoArea}>
                                <section className={style.wordRecordStatusLogoLineArea}>
                                    <section className={style.wordRecordStatusLogoLine}></section>
                                </section>
                                <section className={style.wordRecordStatusLogo}>
                                    <section className={style.wordRecordStatusLogoList}>
                                        <img src="/mapp/image/icon_record_success.png"/>
                                        <p>待录用</p>
                                    </section>
                                    <section className={style.wordRecordStatusLogoList}>
                                        <img src=""/>
                                        <p>待上岗</p>
                                    </section>
                                    <section className={style.wordRecordStatusLogoList}>
                                        <img src=""/>
                                        <p>待结算</p>
                                    </section>
                                    <section className={style.wordRecordStatusLogoList}>
                                        <img src=""/>
                                        <p>已结算</p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </Wrap>
                </section>
            </section>
        )
    }
}