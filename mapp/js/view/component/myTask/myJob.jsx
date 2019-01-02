import React from "react";
import Utils from "../../../store/main/utils.js";
import MyJobAction from "../../../store/main/myJobAction.js";
import OfflineAction from "../../../store/main/offlineAction.js";
import {Link} from "react-router";
import style from "./css/myTask.css";

import Header from '../common/header/header.jsx';
import Wrap from '../common/wrap.jsx';
import JobList from '../common/jobList.jsx';
import NoData from '../common/noData.jsx';
import HistoryBack from '../common/header/historyBack.jsx';

export default class MyJob extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            border: {
                borderBottom: 'none'
            },
            index: 0,
            getAllMyDiliverList: [],
            getToBeEmployList: [],
            getToBeGotoWorkList: [],
            getToBeSettelAccountList: [],
            getClosedSettleList: [],
            page: 1,
        }
        this.listName = 0;
        this.swiper = ""
    }

    componentWillMount = () => {
        this.listName = this.props.params.listName.substr(1)
        this.getJobOfflineList(this.state.page);
        this.getToBeEmployList(this.state.page);
        this.getToBeGotoWorkList(this.state.page);
        this.getToBeSettelAccountList(this.state.page);
        this.getClosedSettleList(this.state.page);
    }

    getJobOfflineList = (page) => {
        let self = this;
        MyJobAction.getJobOfflineList(page,function (data) {
            if(data.code == 0){
                self.setState({
                    getAllMyDiliverList: data.dataMap.jobOfflinePage?data.dataMap.jobOfflinePage:[]
                })
            }
        })
    }

    getToBeEmployList = (page) => {
        let self = this;
        MyJobAction.getToBeEmployList(page,function (data) {
            self.setState({
                getToBeEmployList: data.jobOfflinePage?data.jobOfflinePage:[]
            })
        })
    }

    getToBeGotoWorkList = (page) => {
        let self = this;
        MyJobAction.getToBeGotoWorkList(page,function (data) {
            self.setState({
                getToBeGotoWorkList: data.jobOfflinePage?data.jobOfflinePage:[]
            })
        })
    }

    getToBeSettelAccountList = (page) => {
        let self = this;
        MyJobAction.getToBeSettelAccountList(page,function (data) {
            self.setState({
                getToBeSettelAccountList: data.jobOfflinePage?data.jobOfflinePage:[]
            })
        })
    }

    getClosedSettleList = (page) => {
        let self = this;
        MyJobAction.getClosedSettleList(page,function (data) {
            self.setState({
                getClosedSettleList: data.jobOfflinePage?data.jobOfflinePage:[]
            })
        })
    }

    componentDidMount = () => {
        let self = this;
        this.refs["item"+this.state.index].style.borderBottom = '.04rem solid #37d3cb';
        this.refs["item"+this.state.index].style.color = '#37d3cb';
        var swiper = new Swiper('.swiper-container', {
            initialSlide: self.listName,
            resistanceRatio: 0,
            onSlideChangeEnd: function(swiper) {
                for(let i=0; i<5; i++){
                    self.refs["item"+i].style.borderBottom = 'none';
                    self.refs["item"+i].style.color = '#bbbbbb';
                }
                self.refs["item"+swiper.activeIndex].style.borderBottom = '.04rem solid #37d3cb';
                self.refs["item"+swiper.activeIndex].style.color = '#37d3cb';
            }
        });
        this.swiper = swiper;
    }

    slideController = (index) => {
        this.swiper.slideTo(index, 300, true);
    }

    deldeliverResume = (jobOfflineId) => {
        console.log(jobOfflineId);
        let self = this;
        OfflineAction.deldeliverResume(jobOfflineId,function (data) {
            if(data.code == 0){
                layer.open({
                    content: data.msg,
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
                self.getJobOfflineList(self.state.page);
                self.getToBeEmployList(self.state.page);
                self.getToBeGotoWorkList(self.state.page);
                self.getToBeSettelAccountList(self.state.page);
                self.getClosedSettleList(self.state.page);
            }else{
                layer.open({
                    content: data.msg,
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
            }
        })
    }

    render() {
        return (
            <section>
                <Header title="我的投递" flex="flex-start">
                    <HistoryBack order="1"/>
                </Header>
                <section className={style.jobNav}>
                    <a className={style.navItem} ref="item0" onClick={() => {this.slideController(0)}}>全部</a>
                    <a className={style.navItem} ref="item1" onClick={() => {this.slideController(1)}}>待录用</a>
                    <a className={style.navItem} ref="item2" onClick={() => {this.slideController(2)}}>待上岗</a>
                    <a className={style.navItem} ref="item3" onClick={() => {this.slideController(3)}}>待结算</a>
                    <a className={style.navItem} ref="item4" onClick={() => {this.slideController(4)}}>已结算</a>
                </section>
                <div className="swiper-container" style={{width: "100%",height: "100%"}}>
                    <div className="swiper-wrapper">
                        <div className="swiper-slide" style={{height:'100%',overflow:'scroll'}}>
                            <section className="wrapForMyTask">
                                {
                                    this.state.getAllMyDiliverList.length ? (
                                        this.state.getAllMyDiliverList.map((job,i) => {
                                            return(
                                                <Wrap marginTop=".16rem">
                                                    <JobList key={i}
                                                             title={job.solrJobOffline.title}
                                                             jobDetalStatus={job.dealStatusStr}
                                                             jobClass={job.solrJobOffline.jobTypeStr.split(',')[1]}
                                                             jobTypeStr={job.solrJobOffline.jobTypeStr.split(',')[1]}
                                                             settlementTypeStr={job.solrJobOffline.settlementTypeStr}
                                                             price={job.solrJobOffline.salaryStr}
                                                             salaryUnitStr={job.solrJobOffline.salaryUnitStr}
                                                             latitude={job.solrJobOffline.latitude}
                                                             longitude={job.solrJobOffline.longitude}
                                                    />
                                                </Wrap>
                                            )
                                        })
                                    ) : (
                                        <NoData/>
                                    )
                                }
                            </section>
                        </div>
                        <div className="swiper-slide" style={{height:'100%',overflow:'scroll'}}>
                            <section className="wrapForMyTask">
                                {
                                    this.state.getToBeEmployList.length ? (
                                        this.state.getToBeEmployList.map((job,i) => {
                                            return(
                                                <MyJobList jobId={job.jobId}
                                                           jobRequestId={job.id}
                                                           title={job.solrJobOffline.title}
                                                           jobDetalStatus={job.jobDetalStatus}
                                                           jobClass={job.solrJobOffline.jobTypeStr.split(',')[1]}
                                                           jobTypeStr={job.solrJobOffline.jobTypeStr.split(',')[1]}
                                                           settlementTypeStr={job.solrJobOffline.settlementType}
                                                           salaryUnit={job.solrJobOffline.salaryUnit}
                                                           wage={job.solrJobOffline.salary}
                                                           status="gotoWork"
                                                           clickHandle={() => {this.deldeliverResume(job.jobId)}}
                                                />
                                            )
                                        })
                                    ) : (
                                        <NoData/>
                                    )
                                }
                            </section>
                        </div>
                        <div className="swiper-slide" style={{height:'100%',overflow:'scroll'}}>
                            <section className="wrapForMyTask">
                                {
                                    this.state.getToBeGotoWorkList.length ? (
                                        this.state.getToBeGotoWorkList.map((job,i) => {
                                            return(
                                                <MyJobList id={job.id}
                                                           title={job.solrJobOffline.title}
                                                           jobType={job.solrJobOffline.jobType}
                                                           salaryUnit={job.solrJobOffline.salaryUnit}
                                                           settlementType={job.solrJobOffline.settlementType}
                                                           settlementTypeStr={job.solrJobOffline.settlementType}
                                                           jobDetalStatus={job.dealStatusStr}
                                                           jobClass={job.solrJobOffline.jobTypeStr.split(',')[1]}
                                                           jobTypeStr={job.solrJobOffline.jobTypeStr.split(',')[1]}
                                                />
                                            )
                                        })
                                    ) : (
                                        <NoData/>
                                    )
                                }
                            </section>
                        </div>
                        <div className="swiper-slide" style={{height:'100%',overflow:'scroll'}}>
                            <section className="wrapForMyTask">
                                {
                                    this.state.getToBeSettelAccountList.length ? (
                                        this.state.getToBeSettelAccountList.map((job,i) => {
                                            return(
                                                <MyJobList id={job.id}
                                                           title={job.solrJobOffline.title}
                                                           jobType={job.solrJobOffline.jobType}
                                                           salaryUnit={job.solrJobOffline.salaryUnit}
                                                           settlementType={job.solrJobOffline.settlementType}
                                                           settlementTypeStr={job.solrJobOffline.settlementType}
                                                           jobDetalStatus={job.dealStatusStr}
                                                           jobClass={job.solrJobOffline.jobTypeStr.split(',')[1]}
                                                           jobTypeStr={job.solrJobOffline.jobTypeStr.split(',')[1]}
                                                />
                                            )
                                        })
                                    ) : (
                                        <NoData/>
                                    )
                                }
                            </section>
                        </div>
                        <div className="swiper-slide" style={{height:'100%',overflow:'scroll'}}>
                            <section className="wrapForMyTask">
                                {
                                    this.state.getClosedSettleList.length ? (
                                        this.state.getClosedSettleList.map((job,i) => {
                                            return(
                                                <MyJobList id={job.id}
                                                           title={job.solrJobOffline.title}
                                                           jobType={job.solrJobOffline.jobType}
                                                           salaryUnit={job.solrJobOffline.salaryUnit}
                                                           settlementType={job.solrJobOffline.settlementType}
                                                           settlementTypeStr={job.solrJobOffline.settlementType}
                                                           jobDetalStatus={job.dealStatusStr}
                                                           wage={job.solrJobOffline.salary}
                                                           jobClass={job.solrJobOffline.jobTypeStr.split(',')[1]}
                                                           jobTypeStr={job.solrJobOffline.jobTypeStr.split(',')[1]}
                                                />
                                            )
                                        })
                                    ) : (
                                        <NoData/>
                                    )
                                }
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class MyJobList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <Wrap marginTop=".16rem">
                <Link to={{ pathname: '/workRecordInfo/:' + this.props.jobId,query:{ jobId: this.props.jobId, jobRequestId: this.props.jobRequestId}}} className={style.item}>
                    <section className={style.jobLogo}>
                        {
                            this.props.index == "index" ? (
                                <img style={{width:'1.5rem',height:'1.2rem'}} src={this.props.imgUrl}/>
                            ) : (
                            this.props.indexJobInfo ? (
                                <img style={{width:'1.1rem',height:'1.1rem'}} src={this.props.imgUrl}/>
                            ) : (
                                <img style={{width:'1.1rem',height:'1.1rem'}} src={Utils.imgLogo(this.props.jobClass)}/>
                            )
                            )
                        }
                    </section>
                    <section className={style.textArea}>
                        <section className={style.titleArea}>
                            <section className={style.mainTitle}>
                                <h3 className={style.title}>{this.props.title}</h3>
                            </section>
                            <section>
                                {
                                    this.props.jobDetalStatus == "已取消" ? (
                                        <p className={style.titleDescription} style={{color:'#bbbbbb'}}>{this.props.jobDetalStatus}</p>
                                    ) : (
                                        <p className={style.titleDescription}>{this.props.jobDetalStatus}</p>
                                    )
                                }
                            </section>
                        </section>
                        <section className={style.descriptionArea}>
                            <section className={style.jobTypeArea}>
                                <p className={style.jobType}>{this.props.jobTypeStr}</p>
                                <p className={style.settlementType}>{this.props.settlementTypeStr}</p>
                            </section>
                            {
                                this.props.salaryUnit == "面议" ? (
                                    <section className={style.salaryArea}>
                                        <p className={style.salary}>{this.props.salaryUnit}</p>
                                    </section>
                                ) : (
                                    <section className={style.salaryArea}>
                                        <p className={style.salary}>{this.props.wage}</p>
                                        <p className={style.salaryInfo}>RMB/{this.props.salaryUnit}</p>
                                    </section>
                                )
                            }
                        </section>
                        <section className={style.dateAndLocation}>
                            <section className={style.location}>
                                <p>8.7km</p>
                            </section>
                        </section>
                    </section>
                </Link>
                {
                    this.props.status ? (
                        this.props.status == 'gotoWork' ? (
                            <section className={style.controllJobArea}>
                                <section className={style.controllJob}>
                                    <a onClick={this.props.clickHandle}>取消投递</a>
                                </section>
                                <section className={style.controllJob}>
                                    <a>联系企业</a>
                                </section>
                            </section>
                        ) : (
                            <section className={style.controllJobArea}>
                                <section className={style.controllJob}>
                                    <a>联系企业</a>
                                </section>
                            </section>
                        )
                    ) : (
                        ''
                    )
                }
            </Wrap>
        )
    }
}