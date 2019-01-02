import React from "react";
import {Link, hashHistory} from "react-router";
import Action from "../../../store/main/onlineAction.js";
import BannerAction from "../../../store/main/bannerAction.js";
import Utils from "../../../store/main/utils.js";

import Header from '../common/header/header.jsx';
import HeaderContent from '../common/header/headerContent.jsx';
import Iscroll from '../common/iscroll.jsx';
import Banner from '../common/banner.jsx';
import Sort from '../common/sort.jsx';
import SortItem from '../common/sortItem.jsx';
import OnlineMoney from '../common/onlineMoney.jsx';
import JobList from '../common/jobList.jsx';
import Footer from '../common/footer/footer.jsx';

export default class JobOnline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            scrollControll: true,
            totalPrice: 0,
            bannerList: [],
            page: this.props.location.query.page ? parseInt(this.props.location.query.page) : 1,
            status: false,
            classifyList: [],
            sortTypeList: [],
            sortDataList: [],
            classify: this.props.location.query.classify ? this.props.location.query.classify : "",
            classifyName: "分类",
            sortType: this.props.location.query.sortType ? this.props.location.query.sortType : "",
            sortTypeName: "排序",
            scrollY: this.props.location.query.scrollY ? this.props.location.query.scrollY : -40,
        };
        this.type = "";
        this.pageSize = 15; //初始化一页加载数据数量
    }

    componentWillMount = () => {
        let self = this;
        Utils.cityAPI(function(data) {
            self.getTotalPrice(data,self.state.classify);
            self.getJobOnlineBanner(data);
        });
        this.getConditions();
    }

    getY = (y) => {
        this.setState({
            scrollY: y
        })
    }

    changeScroll = () => {
        Utils.replaceParamVal("scrollY",this.state.scrollY);
    }

    getList = (cityId,pageNo,pageSize,classify,sortType) => {
        let self = this;
        Action.getList(cityId,pageNo,pageSize,classify,sortType,function (data) {
            self.setState({
                items: data.pageList.dataList,
            })
        })
    }

    getJobOnlineBanner = (cityId) => {
        let self = this;
        BannerAction.getJobOnlineBanner(cityId,function (data) {
            self.setState({
                bannerList: data.bannerList,
            })
        })
    }

    getTotalPrice = (cityId,classify) => {
        let self = this;
        Action.getTotalPrice(cityId,classify,function (data) {
            self.setState({
                totalPrice: data.totalPrice
            })
        })
    }

    getConditions = () => {
        let self = this;
        Action.getConditions(function (data) {
            self.setState({
                classifyList: data.classifyList,
                sortTypeList: data.sortTypeList
            })
        })
    }

    fetchItems = (isRefresh,pullDownStatus,pullUpStatus,callback) => {
        let self = this;
        if (isRefresh) {
            Action.getList(window.sessionStorage.cityId,1,this.pageSize * this.state.page,this.state.classify,this.state.sortType,function (data) {
                if (pullDownStatus == 3) {
                    self.setState({
                        items: data.pageList.dataList,
                    })
                    callback();
                }
            })
        }else{
            this.setState({
                page: this.state.page + 1
            },function () {
                Action.getList(window.sessionStorage.cityId,this.state.page,this.pageSize,this.state.classify,this.state.sortType,function (data) {
                    if (pullUpStatus == 2) {
                        if(data.pageList.dataList && data.pageList.dataList.length){
                            self.setState({
                                items: self.state.items.concat(data.pageList.dataList),
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

    choose = (type,falseCallback,successCallback) => {
        let self = this;
        if(this.type == type){
            this.setState({
                status: false,
                scrollControll: true
            },falseCallback);
            this.type = "";
            return false;
        }else{
            this.type = type;
            this.setState({
                status: true,
                scrollControll: false
            },function () {
                for(let i=0;i<2;i++){
                    self.refs["icon"+i].refs["icon"].style.backgroundImage = "";
                }
                successCallback();
                switch (type){
                    case "classify":
                        self.setState({
                            sortDataList: self.state.classifyList
                        });
                        break;
                    case "sortType":
                        self.setState({
                            sortDataList: self.state.sortTypeList
                        });
                        break;
                }
            });
        }
    }

    checkSort = (value,key) => {
        let self = this;
        this.setState({
            status: false,
            scrollControll: true
        },function () {
            for(let i=0;i<2;i++){
                self.refs["icon"+i].refs["icon"].style.backgroundImage = "";
            }
        });
        switch (this.type){
            case "classify":
                this.setState({
                    classify: value,
                    classifyName: key
                },function () {
                    Utils.replaceParamVal("classify",self.state.classify);
                    self.getList(window.sessionStorage.cityId,1,self.pageSize,self.state.classify,self.state.sortType);
                    self.getTotalPrice(window.sessionStorage.cityId,self.state.classify);
                })
                break;
            case "sortType":
                this.setState({
                    sortType: value,
                    sortTypeName: key
                },function () {
                    Utils.replaceParamVal("sortType",self.state.sortType);
                    self.getList(window.sessionStorage.cityId,1,self.pageSize,self.state.classify,self.state.sortType);
                })

                break;
        }
        this.type = "";
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

    render() {
        let lis = [];
        this.state.items.forEach((job, index) => {
            lis.push(
                <Link to={{ pathname: '/taskInfo',query:{ taskId: job.id }}} onClick={() => {this.changeScroll()}}>
                    <JobList key={index}
                             imgUrl={job.bigImageUrl}
                             title={job.title}
                             jobStatus={job.jobType == 2 ? ("每日签到") : (job.isTop ? ("置顶") : (job.isSpecial ? "限时特价" : ""))}
                             jobClass={job.jobClass}
                             isSpecial={job.isSpecial}
                             specialPrice={job.specialPrice}
                             suplusCount={job.fakeSuplusCount}
                             price={job.taskPrice}
                             endDate={job.endDate}
                             isDelete={job.isDelete}
                    />
                </Link>
            );
        })
        return (
            <section>
                <Header title="线上兼职" flex="flex-end">
                    <HeaderContent title="我的任务" url="/myTask"/>
                </Header>
                <Iscroll dataList={lis} fetchItems={this.fetchItems} scrollControll={this.state.scrollControll} getY={this.getY} scrollY={this.state.scrollY}>
                    <Banner bannerList={this.state.bannerList} height="1.58rem"/>
                    <Sort status={this.state.status} sortDataList={this.state.sortDataList} shadowHandle={this.shadowHandle} checkSort={this.checkSort}>
                        <SortItem type="classify" typeName={this.state.classifyName} sort="first" clickHandle={this.choose} ref="icon0"/>
                        <SortItem type="sortType" typeName={this.state.sortTypeName} sort="last" clickHandle={this.choose} ref="icon1"/>
                    </Sort>
                    <OnlineMoney totalPrice={this.state.totalPrice}/>
                </Iscroll>
                <Footer page="online"/>
            </section>
        );
    }
}
