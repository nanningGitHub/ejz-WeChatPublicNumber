import React from "react";
import {Link} from "react-router";
import OnlineAction from "../../../store/main/onlineAction.js";
import Utils from "../../../store/main/utils.js";
import style from "./css/myTask.css";
import Wrap from "../common/wrap.jsx";
import NoData from "../common/noData.jsx";

//导入组件样式

//导入子组件

export default class MyTaskList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderStatus: this.props.orderStatus,
            jobList: [],
            totalPage: 1,
            loadingStatus: true,
        }
        this.pageSize = 15;
        this.page = 1;
    }

    componentWillMount = () => {
        this.myTask(this.state.orderStatus,this.page,this.pageSize);
    }

    myTask = (orderStatus,page,pageSize) => {
        let self = this;
        OnlineAction.myTask(orderStatus, page, pageSize, function (data) {
            if(orderStatus == 0 && data.myTaskList.dataList){
                let jobIsOngoing = [];
                for( let i = 0; i < data.myTaskList.dataList.length; i++){
                    if(data.myTaskList.dataList[i].orderStatus == 0){
                        jobIsOngoing = jobIsOngoing.concat(data.myTaskList.dataList[i]);
                    }else{
                        continue;
                    }
                }
                self.setState({
                    jobList: jobIsOngoing,
                    totalPage: data.myTaskList.totalPage
                })
            }else{
                self.setState({
                    jobList: data.myTaskList.dataList ? data.myTaskList.dataList : [],
                    totalPage: data.myTaskList.totalPage
                })
            }
        })
    }

    scroll = () => {
        let self = this;
        if(this.page < this.state.totalPage){
            if(this.refs.slide.scrollTop + this.refs.slide.offsetHeight >= this.refs.slideList.offsetHeight-1 && this.state.loadingStatus){
                this.setState({
                    loadingStatus: false
                })
                this.page++;
                OnlineAction.myTask(-1,this.page,this.pageSize,function (data) {
                    self.setState({
                        jobList: self.state.jobList.concat(data.myTaskList.dataList),
                        loadingStatus: true
                    })
                })
            }
        }else{
            this.setState({
                loadingStatus: false
            })
        }
    }

    render() {
        return (
            <div className="swiper-slide" style={{height:'100%',overflow:'scroll'}} ref="slide" onScroll={this.scroll}>
                <section className="wrapForMyTask" ref="slideList">
                    {
                        this.state.jobList && this.state.jobList.length ? (
                            <section>
                                {
                                    this.state.jobList.map((job,i) => {
                                        return(
                                            <MyTaskItem key={i}
                                                        pageStatus={this.state.orderStatus}
                                                        id={job.id}
                                                        title={job.title}
                                                        suplusCount={job.suplusCount}
                                                        endDate={job.endDate}
                                                        orderStatus={job.orderStatus}
                                                        orderBeginDate={job.orderBeginDate ? job.orderBeginDate : ""}
                                                        overdueTime={job.overdueTime}
                                                        taskPrice={job.taskPrice}
                                            >
                                                {}
                                            </MyTaskItem>
                                        )
                                    })
                                }
                            </section>
                        ) : (
                            <NoData/>
                        )
                    }
                </section>
            </div>
        )
    }
}

class MyTaskItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imgUrl: "",
            status: "",
            restTime: "",
        }
    }

    componentDidMount = () => {
        let self = this;
        let nowTime = new Date();
        let endTime = new Date(this.props.orderBeginDate + this.props.overdueTime); //计算订单的过期时间
        let t = endTime.getTime() - nowTime.getTime();
        if(t >= 0) { //结束时间大于当前时间，证明没有过期
            self.time = setInterval(function() {
                Utils.getCountDown(self.props.orderBeginDate,self.props.overdueTime,function(countDownTime){
                    self.setState({
                        restTime: countDownTime
                    })
                },function(){
                    clearInterval(self.time);
                })
            },1000)
        }
        switch (this.props.orderStatus){
            case 0:
                this.setState({
                    imgUrl: 'url(/mapp/image/background_doing.jpg)',
                    status: "进行中"
                })
                break;
            case 1:
                this.setState({
                    imgUrl: 'url(/mapp/image/background_review.jpg)',
                    status: "审核中"
                })
                break;
            case 2:
                this.setState({
                    imgUrl: 'url(/mapp/image/background_outdate.jpg)',
                    status: "已完成"
                })
                break;
            case 3:
                this.setState({
                    imgUrl: 'url(/mapp/image/background_outdate.jpg)',
                    status: "已过期"
                })
                break;
            case 4:
                this.setState({
                    imgUrl: 'url(/mapp/image/background_outdate.jpg)',
                    status: "未通过"
                })
                break;
        }
    }

    render(){
        return(
            <Wrap marginTop="0.16rem">
                <Link to={{ pathname: '/taskInfo',query:{ taskId: this.props.id }}}>
                    <section className={style.myTask}>
                        <section className={style.leftArea}>
                            <p className={style.taskTitle}>{this.props.title}</p>
                            <p className={style.taskInfoTitle}><span className={style.taskInfo}>剩余：{this.props.suplusCount}次</span></p>
                            {
                                this.props.pageStatus == 0 ? (
                                    <p className={style.taskInfoTitle}>开始时间：<span className={style.taskInfo}>{Utils.getLocalTime(new Date(this.props.orderBeginDate))}</span></p>
                                ) : (
                                    <p className={style.taskInfoTitle}>截止：<span className={style.taskInfo}>{Utils.getLocalTime(new Date(this.props.endDate))}</span></p>
                                )
                            }
                        </section>
                        <section className={style.rightArea} style={{backgroundImage: this.state.imgUrl}}>
                            {
                                this.props.pageStatus == 0 ? (
                                    <p className={style.status}>继续任务</p>
                                ) : (
                                    <p className={style.status}>{this.state.status}</p>
                                )
                            }
                            <p className={style.taskSalary}>{this.props.taskPrice}</p>
                            <p className={style.status}>RMB</p>
                        </section>
                    </section>
                    {
                        this.props.pageStatus == 0 ? (
                            <section className={style.restTime}>
                                <p className={style.taskInfoTitle}>剩余时间：<span className={style.taskInfo}>{this.state.restTime}</span></p>
                            </section>
                        ) : ("")
                    }
                </Link>
            </Wrap>
        )
    }
}