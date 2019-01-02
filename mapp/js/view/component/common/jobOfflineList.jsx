import React from "react";
import {Link} from "react-router";
import Action from "../../../store/main/offlineAction.js";
import Utils from "../../../store/main/utils.js";

import Header from './header/header.jsx';
import HistoryBack from './header/historyBack.jsx';
import Iscroll from '../common/iscroll.jsx';
import JobList from '../common/jobList.jsx';

export default class JobOfflineList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            scrollControll: true,
            cityId: window.sessionStorage.cityId,
            settlementType: this.props.location.query.settlementType ? this.props.location.query.settlementType : "",
            latitude: this.props.location.query.latitude ? this.props.location.query.latitude : "",
            longitude: this.props.location.query.longitude ? this.props.location.query.longitude : "",
            toType: this.props.location.query.toType ? this.props.location.query.toType : "",
            page: this.props.location.query.page ? parseInt(this.props.location.query.page) : 1,
            scrollY: this.props.location.query.scrollY ? this.props.location.query.scrollY : -40,
        }
        this.pageSize = 15; //初始化一页加载数据数量
    }

    getY = (y) => {
        this.setState({
            scrollY: y
        })
    }

    changeScroll = () => {
        Utils.replaceParamVal("scrollY",this.state.scrollY);
    }

    fetchItems = (isRefresh,pullDownStatus,pullUpStatus,callback) => {
        let self = this;
        console.log(this)
        if( this.state.toType == 12){
            if (isRefresh) {
                if(this.state.cityId){
                    Action.getHighSalaryList(this.state.cityId, 1, this.pageSize * this.state.page,function (data) {
                        if (pullDownStatus == 3) {
                            self.setState({
                                items: data.jobOfflinePage.dataList,
                            });
                            callback();
                        }
                    })
                }else{
                    Utils.cityAPI(function(cityId) {
                        self.setState({
                            cityId: cityId
                        },function () {
                            Action.getHighSalaryList(self.state.cityId, 1, self.pageSize * self.state.page,function (data) {
                                if (pullDownStatus == 3) {
                                    self.setState({
                                        items: data.jobOfflinePage.dataList,
                                    });
                                    callback();
                                }
                            })
                        })
                    });
                }
            }else{
                this.setState({
                    page: this.state.page + 1
                },function () {
                    Action.getHighSalaryList(this.state.cityId,this.state.page,this.pageSize,function (data) {
                        if (pullUpStatus == 2) {
                            if(data.jobOfflinePage.dataList && data.jobOfflinePage.dataList.length){
                                self.setState({
                                    items: self.state.items.concat(data.jobOfflinePage.dataList)
                                });
                                Utils.replaceParamVal("page",self.state.page);
                            }else{
                                layer.open({
                                    content: '已全部加载完成',
                                    skin: 'msg',
                                    style: 'color:#ffffff;bottom:0;',
                                    time: 3
                                });
                            }
                        }
                        callback();
                    })
                })
            }
        }else{
            if (isRefresh) {
                if(this.state.cityId){
                    Action.getList(this.state.cityId, 1, this.pageSize * this.state.page, "", "", this.state.settlementType, "", this.latitude, this.longitude, "", function (data) {
                        if (pullDownStatus == 3) {
                            self.setState({
                                items: data.jobOfflinePage.dataList,
                            });
                            callback();
                        }
                    })
                }else{
                    Utils.cityAPI(function(cityId) {
                        self.setState({
                            cityId: cityId
                        },function () {
                            Action.getList(self.state.cityId, 1, self.pageSize * self.state.page, "", "", this.settlementType, "", this.latitude, this.longitude, "", function (data) {
                                if (pullDownStatus == 3) {
                                    self.setState({
                                        items: data.jobOfflinePage.dataList,
                                    });
                                    callback();
                                }
                            })
                        })
                    });
                }
            }else{
                this.setState({
                    page: this.state.page + 1
                },function () {
                    Action.getList(this.state.cityId,this.state.page,this.pageSize,"", "", this.settlementType, "", this.latitude, this.longitude, "",function (data) {
                        if (pullUpStatus == 2) {
                            if(data.jobOfflinePage.dataList && data.jobOfflinePage.dataList.length){
                                self.setState({
                                    items: self.state.items.concat(data.jobOfflinePage.dataList)
                                });
                                Utils.replaceParamVal("page",self.state.page);
                            }else{
                                layer.open({
                                    content: '已全部加载完成',
                                    skin: 'msg',
                                    style: 'color:#ffffff;bottom:0;',
                                    time: 3
                                });
                            }
                        }
                        callback();
                    })
                })
            }
        }
    }

    render() {
        let lis = [];
        this.state.items.forEach((job, index) => {
            lis.push(
                <Link to={{ pathname: '/jobInfo',query:{ article: JSON.stringify(job) }}} onClick={() => {this.changeScroll()}}>
                    <JobList key={index}
                             title={job.title}
                             jobClass={job.jobTypeStr.split(',')[1]}
                             jobTypeStr={job.jobTypeStr.split(',')[1]}
                             settlementTypeStr={job.settlementTypeStr}
                             price={job.salaryStr}
                             salaryUnitStr={job.salaryUnitStr}
                             startDate={job.createdDate}
                             endDate={job.endDate}
                             latitude={job.latitude}
                             longitude={job.longitude}
                    />
                </Link>
            );
        })
        return (
            <section>
                <Header title="全部兼职" flex="flex-start">
                    <HistoryBack order="1"/>
                </Header>
                <Iscroll dataList={lis} fetchItems={this.fetchItems} scrollControll={this.state.scrollControll} getY={this.getY} scrollY={this.state.scrollY}>
                </Iscroll>
            </section>
        )
    }
}