import React from "react";
import {Link, hashHistory} from "react-router";
import Action from "../../../store/main/resumeLibAction.js";
import Utils from "../../../store/main/utils.js";

import Header from '../common/header/header';
import Iscroll from '../common/iscroll.jsx';
import ResumeItem from './resumeItem.jsx';
import HistoryBack from '../common/header/historyBack';

/*
* 购买记录页面
* */
export default class GoumaiJilu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            scrollControll: true,
            pageSize: 15,
            totalPage: 0,
            status: false,
            cityName: window.localStorage.cityName,
            scrollY: this.props.location.query.scrollY ? this.props.location.query.scrollY : -40,
        }
        this.page = 1;
        this.cityId = window.localStorage.cityId;
        this.settlementType = "";
        this.sortType = "";
        this.latitude = "";
        this.longitude = "";
        this.searchkey = "";
    }

    componentWillMount = () => {
    }
    getList = (pageNo,pageSize,latitude,longitude) => {
        let self = this;
        Action.getPayList(pageNo,pageSize,latitude,longitude,function (data) {
            self.setState({
                items: data.pagePayList.dataList?data.pagePayList.dataList:[],//data.jobOfflinePage.dataList,
                totalPage: data.pagePayList.totalPage, //data.jobOfflinePage.totalPage
            })
        })
    }

    fetchItems = (isRefresh,pullDownStatus,pullUpStatus,callback) => {
        let self = this;
        if (isRefresh) {
            Action.getPayList(1,this.state.pageSize * this.page,this.latitude,this.longitude,function (data) {
                if (pullDownStatus == 3) {
                    self.setState({
                        items: data.pagePayList.dataList?data.pagePayList.dataList:[],//data.jobOfflinePage.dataList,
                        totalPage: data.pagePayList.totalPage //data.jobOfflinePage.totalPage
                    })
                    callback();
                }
            })
        }else{
            if(this.page < this.state.totalPage){
                this.page = this.page + 1;
                Action.getPayList(this.page,this.state.pageSize,this.latitude,this.longitude,function (data) {
                    if (pullUpStatus == 2) {
                        self.setState({
                            items: self.state.items.concat(data.pagePayList.dataList?data.pagePayList.dataList:[])
                        })
                    }
                })
            }else{
                layer.open({
                    content: '已全部加载完成',
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
            }
        }
    }
    historyBack = () => {
        hashHistory.push('/jianLiTaoCan')
    }
    shadowHandle = () => {
        let self = this;
        this.type = "";
        this.setState({
            status: false,
            scrollControll: true
        },function () {
            for(let i=0;i<2;i++){
                self.refs["icon"+i].refs["icon"].style.backgroundImage = "";
            }
        });
    }
    getY = (y) => {
        this.setState({
            scrollY: y
        })
    }

    changeScroll = () => {
        Utils.replaceParamVal("scrollY",this.state.scrollY);
    }
    render() {
        let lis = [];
        this.state.items.forEach((job, index) => {
            lis.push(
                <Link to={{ pathname: '/resumeInfo',query:{ article: JSON.stringify(job) }}}>
                    <ResumeItem  page="offline"
                                 id={job.userId}
                                 resumeId={job.id}
                              realName={job.realName}
                              headerFile={job.headerFile ? job.headerFile : ""}
                              gender={job.gender==1?"男":"女"}
                              area={job.area}
                              age = {job.age}
                              school={job.school}
                              profession={job.profession}
                              mobile={job.mobile}
                    />
                </Link>
            );
        })

        return (
            <section>
                <Header title="简历购买记录">
                    <HistoryBack order="1"/>
                </Header>
                <Iscroll dataList={lis} totalPage={this.state.totalPage} fetchItems={this.fetchItems} scrollControll={this.state.scrollControll} getY={this.getY} scrollY={this.state.scrollY}>
                </Iscroll>
            </section>
        )
    }
}