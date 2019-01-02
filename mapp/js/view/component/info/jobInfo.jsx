import React from 'react';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History } from 'react-router';
import Utils from '../../../store/main/utils.js';
import OfflineAction from '../../../store/main/offlineAction.js';
import style from "./css/info.css";
import Header from '../common/header/header.jsx';
import Wrap from '../common/wrap.jsx';
import JobList from '../common/jobList.jsx';
import List from '../common/list.jsx';
import ListInfo from '../common/listInfo.jsx';
import HistoryBack from '../common/header/historyBack.jsx';
import Collect from '../common/header/collect.jsx';
import Welfare from '../common/welfare.jsx';
import FooterForInfo from '../common/footer/footerForInfo.jsx';
import FooterButton from '../common/footerButton.jsx';

export default class JobInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobData: this.props.location.query.article ? JSON.parse(this.props.location.query.article) : '',
            jobId: this.props.location.query.jobId ? this.props.location.query.jobId : '',
            isIndex: this.props.location.query.isIndex ? true : false,
            isdeliver: false,
            deliverDelay: false
        }
    }

    componentWillMount = () => {
        let self = this
        if(this.state.jobData){
            window.scrollTo(0,0);
        }else{
            if(this.state.jobId){
                window.scrollTo(0,0);
                OfflineAction.getSingle(this.state.jobId,function (data) {
                    self.setState({
                        jobData: data.dataMap.jobOffline
                    })
                })
            }else{
                hashHistory.push('/jobOffline');
            }
        }

    }

    render() {
        return (
            <section>
                <Header title="兼职详情" flex="flex-start">
                    <HistoryBack />
                    <Collect jobOfflineId={ this.state.jobData.id ? this.state.jobData.id : this.state.jobId } />
                </Header>
                <section className="wrap">
                    <Wrap marginTop="0.16rem">
                        <JobList index="jobInfo"
                                 indexJobInfo={this.state.isIndex}
                                 title={this.state.jobData ? this.state.jobData.title : ''}
                                 imgUrl={this.state.jobData.bigImageUrl ? this.state.jobData.bigImageUrl : ""}
                                 jobClass={this.state.jobData ? this.state.jobData.jobTypeStr.split(',')[1] : ""}
                                 jobTypeStr={this.state.jobData ? this.state.jobData.jobTypeStr.split(',')[1] : ""}
                                 settlementTypeStr={this.state.jobData ? this.state.jobData.settlementTypeStr : ""}
                                 price={this.state.jobData ? this.state.jobData.salaryStr : ""}
                                 salaryUnitStr={this.state.jobData ? this.state.jobData.salaryUnitStr : ""}
                                 modifyDate={this.state.jobData ? this.state.jobData.modifyDate : ""}
                        />
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <section className={style.infoAreaWithBorder}>
                            <p>兼职类型：{this.state.jobData.jobTypeStr}</p>
                            <p>招聘人数：{this.state.jobData.needNumber}</p>
                            <p>性别要求：{
                                (() =>  {
                                switch (this.state.jobData.genderLimit){
                                    case 0: return (
                                        '女'
                                    )
                                    case 1: return (
                                        '男'
                                    )
                                    case 2: return (
                                        '不限'
                                    )
                                }
                                })()
                            }
                            </p>
                        </section>
                        <section className={style.infoArea}>
                            <p>工作日期：{Utils.getLocalTime(new Date(this.state.jobData.startDate))}至{Utils.getLocalTime(new Date(this.state.jobData.endDate))}</p>
                            <p>工作时段：{Utils.getTime(new Date(this.state.jobData.startDate))}至{Utils.getTime(new Date(this.state.jobData.endDate))}</p>
                            <p>工作地点：{this.state.jobData.address}</p>
                        </section>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <section className={style.welfareArea}>
                            <section className={style.welfareTitle}>
                                <p>兼职福利</p>
                            </section>
                            <section className={style.welfare}>
                                {
                                    this.state.jobData.baoChi ? (
                                        <Welfare title="包餐饮"
                                                 backgroundImage="url(/mapp/image/welfare_1.png)"
                                        />
                                    ) : ""
                                }
                                {
                                    this.state.jobData.baoZhu ? (
                                        <Welfare title="包住宿"
                                                 backgroundImage="url(/mapp/image/welfare_2.png)"
                                        />
                                    ) : ""
                                }
                                {
                                    this.state.jobData.zhengMing ? (
                                        <Welfare title="实习证明"
                                                 backgroundImage="url(/mapp/image/welfare_3.png)"
                                        />
                                    ) : ""
                                }
                                {
                                    this.state.jobData.baoXian ? (
                                        <Welfare title="上保险"
                                                 backgroundImage="url(/mapp/image/welfare_4.png)"
                                        />
                                    ) : ""
                                }
                            </section>
                        </section>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <section className={style.infoAreaWithBorder}>
                            <p className={style.infoTitle}>工作内容</p>
                            {
                                this.state.jobData.content ? (
                                    Utils.splitContent(this.state.jobData.content).map((content,i)=>{
                                        return(
                                            <p className={style.infoMain} key={i}>
                                                {content}
                                            </p>
                                        )
                                    })
                                ) : ("")
                            }
                        </section>
                        <List title="已报名同学">
                            <ListInfo infoTitle={this.state.jobData.deliverTimes + "人"} style="content"/>
                        </List>
                    </Wrap>
                    {
                        this.state.isIndex ? (
                            ""
                        ) : (
                            <Link to={{ pathname: '/companyInfo/:' + this.state.jobData.enterpriseId,query:{ enterpriseId : this.state.jobData.enterpriseId }}}>
                                <Wrap marginTop="0.16rem">
                                    <List title="发布企业">
                                        <ListInfo infoTitle={this.state.jobData.enterpriseName} style="content"/>
                                    </List>
                                </Wrap>
                            </Link>
                        )
                    }
                    <section className={style.tipArea}>
                        <section className={style.tip}>
                            <p>联系我时请说明在e兼职看到</p>
                            <p>凡收取费用的兼职，请谨慎投递</p>
                        </section>
                        <Link to={{ pathname: "/jobFeedback", query:{ jobOfflineId : this.state.jobData.id }}}>我要投诉</Link>
                    </section>
                </section>
                <FooterForInfo>
                    <FooterButton name="咨询"
                                  backgroundImage="url(/mapp/image/icon_consult.png)"
                    />
                    <DeliverStatus jobOfflineId={ this.state.jobData.id ? this.state.jobData.id : this.state.jobId }/>
                </FooterForInfo>
            </section>
        )
    }
}

class DeliverStatus extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            isDeliver: false
        }
    }

    componentWillMount = () => {
        let self = this;
        OfflineAction.getisdeliver(this.props.jobOfflineId,function (data) {
            self.setState({
                isDeliver: data.dataMap.isdeliver
            })
        })
    }

    render(){
        return(
            <section className="flex1">
                {
                    this.state.isDeliver ? (
                            <section className="e-footer-is-deliver">
                                <p>已投递</p>
                            </section>
                        ) : (
                            <DeliverButton jobOfflineId={this.props.jobOfflineId}/>
                        )
                }
            </section>
        )
    }
}

class DeliverButton extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            deliverDelay: true
        }
    }

    deliverResume = (jobOfflineId) => {
        let self = this;
        this.setState({
            deliverDelay: false
        })
        OfflineAction.deliverResume(jobOfflineId, function (data) {
            if(data.code == 0){
                hashHistory.push('/offlineSuccess')
            }else{
                setTimeout(function () {
                    self.setState({
                        deliverDelay: true
                    })
                },3000);
                layer.open({
                    content: data.msg,
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
            }
        })
    }

    render(){
        return(
            <section className="e-footer-deliverButton">
                {
                    this.state.deliverDelay ? (
                            <p onClick={() => {this.deliverResume(this.props.jobOfflineId)}}>投递简历</p>
                        ) : (
                            <p>正在投递</p>
                        )
                }
            </section>
        )
    }
}