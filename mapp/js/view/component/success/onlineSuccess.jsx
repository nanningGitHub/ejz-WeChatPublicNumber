import React from "react";
import {Link, hashHistory} from "react-router";
import OnlineAction from "../../../store/main/onlineAction.js";
import style from "./css/success.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import Wrap from '../common/wrap.jsx'
import Icon from '../common/icon.jsx'
import JobList from '../common/jobList.jsx'

export default class OnlineSuccess extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            taskPrice: this.props.location.query.taskPrice,
            jobonlineId: this.props.location.query.taskId,
            jobList: []
        }
    }

    componentWillMount = () => {
        this.recommend(window.sessionStorage.cityId);
    }

    recommend = (cityId) => {
        let self = this;
        OnlineAction.recommend(cityId,function (data) {
            self.setState({
                jobList: data.jobList
            })
        })
    }

    historyBack = () => {
        hashHistory.push({pathname:'/jobOnline'})
    }

    render() {
        return (
            <section>
                <Header title="报名成功" flex="flex-start">
                    <HistoryBack onHandle={this.historyBack}/>
                </Header>
                <section className="wrapWithHeader">
                    <Wrap marginTop="0.16rem">
                        <section className={style.iconArea}>
                            <Icon width="1.8rem" height="1.8rem" backgroundImage="url(/mapp/image/icon_success.png)"/>
                        </section>
                        <section style={{marginBottom: '.66rem'}} className={style.successText}>
                            <p>感谢您完成了线上兼职！</p>
                            <p>您的审核中金额已增加<span>{this.state.taskPrice}</span>元</p>
                        </section>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <section className={style.jobTitle}>
                            <h2>为您推荐</h2>
                        </section>
                        {
                            this.state.jobList && this.state.jobList.length ? (
                                this.state.jobList.map((job,i) => {
                                    return(
                                        <Link to={{ pathname: '/taskInfo',query:{ taskId : job.id }}}>
                                            <JobList key={i}
                                                     imgUrl={job.bigImageUrl}
                                                     title={job.title}
                                                     jobStatus={job.jobType == 2 ? ("每日签到") : (job.isTop ? ("置顶") : (job.isSpecial ? "限时特价" : ""))}
                                                     jobClass={job.jobClass}
                                                     isSpecial={job.isSpecial}
                                                     specialPrice={job.specialPrice}
                                                     suplusCount={job.suplusCount}
                                                     price={job.taskPrice}
                                                     endDate={job.endDate}
                                            />
                                        </Link>
                                    )
                                })
                            ) : (
                                ""
                            )
                        }
                    </Wrap>
                </section>
            </section>
        )
    }
}