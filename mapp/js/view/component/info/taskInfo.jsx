import React from "react";
import {Link} from "react-router";
import OnlineAction from "../../../store/main/onlineAction.js";
import Utils from "../../../store/main/utils.js";
import style from "./css/info.css";

import Header from '../common/header/header.jsx';
import FooterForInfo from '../common/footer/footerForInfo.jsx';
import Wrap from '../common/wrap.jsx';
import Icon from '../common/icon.jsx';
import HistoryBack from '../common/header/historyBack.jsx';

export default class TaskInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobData: [],
            jobOnLineSteps: [],
            jobonlineId: this.props.location.query.taskId,
            taskStatus: 0,
            createdDate: "",
            restTime: "",
        }
        this.time = "";
    }
    
    componentWillMount = () => {
        this.getSingle(this.state.jobonlineId);
        this.getStep(this.state.jobonlineId);
    }

    componentWillUnmount = () => {
        clearInterval(this.time);
    }

    getSingle = (jobonlineId) => {
        let self = this;
        OnlineAction.getSingle(jobonlineId,function (data) {
            self.setState({
                jobData: data.description,
            },function () {
                self.getOrderInfo(jobonlineId)
            })
        })
    }

    getStep = (jobonlineId) => {
        let self = this;
        OnlineAction.getStep(jobonlineId,function (data) {
            self.setState({
                jobOnLineSteps: data.jobOnLineSteps
            })
        })
    }

    getOrderInfo = (jobonlineId) => {
        let self = this;
        OnlineAction.getOrderInfo(jobonlineId,function (data) {
            if(data.status == 1){ //判断订单状态
                if(data.createdDate){ //判断订单是否存在创建时间
                    let nowTime = new Date();
                    let endTime = new Date(data.createdDate + self.state.jobData.overdueTime); //计算订单的过期时间
                    let t = endTime.getTime() - nowTime.getTime();
                    if(t >= 0) { //结束时间大于当前时间，证明没有过期
                        self.setState({
                            taskStatus: 1,
                        },function () {
                            self.time = setInterval(function() {
                                Utils.getCountDown(data.createdDate,self.state.jobData.overdueTime,function(countDownTime){
                                    self.setState({
                                        restTime: countDownTime
                                    })
                                },function(){
                                    self.setState({
                                        taskStatus: 0
                                    })
                                    clearInterval(self.time);
                                })
                            },1000)
                        })
                    }else{ //已过期
                        self.setState({
                            taskStatus: 0,
                        })
                    }
                }
            }else{
                self.setState({
                    taskStatus: data.status
                })
            }
        })
    }

    beginTask = () => {
        let self = this;
        OnlineAction.beginTask(this.state.jobonlineId,function (data) {
            self.setState({
                taskStatus: 1,
                createdDate: new Date().getTime(),
            },function () {
                self.time = setInterval(function() {
                    Utils.getCountDown(self.state.createdDate,self.state.jobData.overdueTime,function(countDownTime){
                        self.setState({
                            restTime: countDownTime
                        })
                    },function(){
                        self.setState({
                            taskStatus: 0
                        })
                        clearInterval(self.time);
                    })
                },1000)
            })
        })
    }

    render() {
        return (
            <section>
                <Header title="任务说明">
                    <HistoryBack />
                </Header>
                <section className="wrap">
                    <Wrap marginTop="0.16rem">
                        <section className={style.taskItem + " flex flex-row flex-start"}>
                            <section className={style.taskLeft}>
                                <section className={style.taskTitle}>
                                    <h3>{this.state.jobData.title}</h3>
                                </section>
                                <section className={style.taskRule + " flex flex-row flex-start flex-wrap"}>
                                    <p>截止：<span>{Utils.getLocalTime(new Date(this.state.jobData.endDate))}</span></p>
                                    <p>审核：<span>{Utils.timeToHours(this.state.jobData.auditCiycle)}小时</span></p>
                                    <p>限制：<span>{this.state.jobData.restrict}</span></p>
                                    <p>剩余：<span>{this.state.jobData.fakeSuplusCount}次</span></p>
                                </section>
                            </section>
                            <section className={style.taskRight + " flex flex-row align-center"}>
                                <section className={style.taskStatusArea}>
                                    {
                                        this.state.jobData.isSpecial ? (
                                            <p className={style.taskSalaryOld}>{this.state.jobData.specialPrice}</p>
                                        ) : ""
                                    }
                                    <p className={style.taskSalary}>{this.state.jobData.taskPrice}</p>
                                    <p className={style.taskStatus}>RMB/次</p>
                                </section>
                            </section>
                        </section>
                    </Wrap>
                    <Wrap marginTop=".16rem">
                        <section className={style.taskContentArea}>
                            <section className={style.taskContentTitle + " flex flex-row flex-start align-center"}>
                                <Icon width=".34rem" height=".34rem" backgroundImage="url(/mapp/image/icon_task_info.png)"/>
                                <h3>任务说明</h3>
                            </section>
                            <section className={style.taskContent}>
                                {
                                    this.state.jobData.description ? (
                                        Utils.splitContent(this.state.jobData.description).map((content,i) => {
                                            return(
                                                <p key={i}>{content}</p>
                                            )
                                        })
                                    ) : ("")
                                }
                            </section>
                        </section>
                    </Wrap>
                    <Wrap marginTop=".16rem">
                        <section className={style.taskContentArea}>
                            <section className={style.taskContentTitle + " flex flex-row flex-start align-center"}>
                                <Icon width=".34rem" height=".34rem" backgroundImage="url(/mapp/image/icon_task_step.png)"/>
                                <h3>任务步骤</h3>
                            </section>
                            <section className={style.taskContent + " flex flex-row flex-start"}>
                                {
                                    this.state.jobOnLineSteps ? (
                                        this.state.jobOnLineSteps.map((steps,i) => {
                                            return(
                                                <section key={i} className={style.stepArea}>
                                                    <p className={style.stepNum}>第{i + 1}步</p>
                                                    <section>
                                                        <p className={style.stepTitle}>{steps.content}</p>
                                                        {
                                                            steps.urlList ? (
                                                                steps.urlList.map((imgUrl) => {
                                                                    return(
                                                                        <section className={style.stepImgArea}>
                                                                            <img src={imgUrl}/>
                                                                        </section>
                                                                    )
                                                                })
                                                            ) : ""
                                                        }
                                                    </section>
                                                </section>
                                            )
                                        })
                                    ) : ('')
                                }
                            </section>
                        </section>
                    </Wrap>
                </section>
                <FooterForInfo>
                    <section className="submitButtonFooter">
                        {
                            (() => {
                                switch (this.state.taskStatus){
                                    case 0: return(
                                        <a onClick={() => {this.beginTask()}}>进行任务</a>
                                    );
                                    case 1: return(
                                        <Link to={{ pathname: '/doTask',query:{ taskId: this.state.jobonlineId, jobData: JSON.stringify(this.state.jobData) }}}>
                                            <span>{this.state.restTime}</span>
                                            提交任务
                                        </Link>
                                    );
                                    case 2 :return(
                                        <a>审核中</a>
                                    )
                                    case 3 :return(
                                        <a>已完成</a>
                                    )
                                    case 4 :return(
                                        <a style={{backgroundColor: '#bbbbbb'}}>已下架</a>
                                    )
                                }
                            })()
                        }
                    </section>
                </FooterForInfo>
            </section>
        )
    }
}