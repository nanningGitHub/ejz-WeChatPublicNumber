import React from "react";
import {Link} from "react-router";
import Action from "../../../store/main/offlineAction.js";
import Utils from "../../../store/main/utils.js";

import Header from '../common/header/header.jsx';
import SearchIcon from '../common/header/searchIcon.jsx';
import Iscroll from '../common/iscroll.jsx';
import Sort from '../common/sort.jsx';
import SortItem from '../common/sortItem.jsx';
import JobList from '../common/jobList.jsx';
import Footer from '../common/footer/footer.jsx';

export default class JobOffline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            scrollControll: true,
            page: this.props.location.query.page ? parseInt(this.props.location.query.page) : 1,
            status: false,
            cityList: [],
            jobTypeList: [],
            settlementList: [],
            sortTypeList: [],
            sortDataList: [],
            cityId: this.props.location.query.cityId ? this.props.location.query.cityId : "",
            cityName: "",
            mainJobType: this.props.location.query.mainJobType ? this.props.location.query.mainJobType : "",
            subJobType: this.props.location.query.subJobType ? this.props.location.query.subJobType : "",
            jobTypeName: "职位类型",
            settlementType: this.props.location.query.settlementType ? this.props.location.query.settlementType : "",
            settlementName: "结算方式",
            sortType: this.props.location.query.sortType ? this.props.location.query.sortType : "",
            sortTypeName: "默认排序",
            sortDataListTwoColumns: false,
            scrollY: this.props.location.query.scrollY ? this.props.location.query.scrollY : -40,
        }
        this.pageSize= 15; //初始化一页加载数据数量
    }

    componentWillMount = () => {
        let self = this;
        Utils.cityAPI(function(cityId) {
            self.getConditions(cityId);
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

    getConditions = (cityId) => {
        let self = this;
        Action.getConditions(cityId,function (data) {
            self.setState({
                cityList: data.cityList,
                cityName: data.cityList[0].key,
                jobTypeList: data.jobTypeList,
                settlementList: data.settlementList,
                sortTypeList: data.sortTypeList,
            })
        })
    }

    getList = (cityId,pageNo,pageSize,mainJobType,subJobType,settlementType,sortType,latitude,longitude,searchkey) => {
        let self = this;
        Action.getList(cityId,pageNo,pageSize,mainJobType,subJobType,settlementType,sortType,latitude,longitude,searchkey,function (data) {
            self.setState({
                items: data.jobOfflinePage.dataList,
            })
        })
    }

    fetchItems = (isRefresh,pullDownStatus,pullUpStatus,callback) => {
        let self = this;
        if (isRefresh) {
            if(this.state.cityId){
                Action.getList(this.state.cityId, 1, this.pageSize * this.state.page, this.state.mainJobType, this.state.subJobType, this.state.settlementType, this.state.sortType, "", "", "", function (data) {
                    if (pullDownStatus == 3) {
                        self.setState({
                            items: data.jobOfflinePage.dataList,
                        });
                        callback();
                    }
                })
            }else{
                Utils.cityAPI(function(cityId,cityName) {
                    self.setState({
                        cityId: cityId,
                        cityName: cityName
                    },function () {
                        Action.getList(self.state.cityId, 1, self.pageSize * self.state.page, self.state.mainJobType, self.state.subJobType, self.state.settlementType, self.state.sortType, "", "", "", function (data) {
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
                Action.getList(this.state.cityId,this.state.page,this.pageSize,this.state.mainJobType,this.state.subJobType,this.state.settlementType,this.state.sortType,"","","",function (data) {
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
                    case "city":
                        self.setState({
                            sortDataList: self.state.cityList,
                            sortDataListTwoColumns: false
                        });
                        break;
                    case "jobType":
                        self.setState({
                            sortDataList: self.state.jobTypeList,
                            sortDataListTwoColumns: true
                        });
                        break;
                    case "settlement":
                        self.setState({
                            sortDataList: self.state.settlementList,
                            sortDataListTwoColumns: false
                        });
                        break;
                    case "sortType":
                        self.setState({
                            sortDataList: self.state.sortTypeList,
                            sortDataListTwoColumns: false
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
            for(let i=0;i<4;i++){
                self.refs["icon"+i].refs["icon"].style.backgroundImage = "";
            }
        });
        switch (this.type){
            case "city":
                this.setState({
                    cityId: value,
                    cityName: key
                },function () {
                    Utils.replaceParamVal("cityId",self.state.cityId);
                    self.getList(self.state.cityId,1,self.pageSize,self.state.mainJobType,self.state.subJobType,self.state.settlementType,self.state.sortType,"","","");
                })
                break;
            case "settlement":
                this.setState({
                    settlementType: value,
                    settlementName: key
                },function () {
                    Utils.replaceParamVal("settlementType",self.state.settlementType);
                    self.getList(self.state.cityId,1,self.pageSize,self.state.mainJobType,self.state.subJobType,self.state.settlementType,self.state.sortType,"","","");
                })
                break;
            case "sortType":
                this.setState({
                    sortType: value,
                    sortTypeName: key
                },function () {
                    Utils.replaceParamVal("sortType",self.state.sortType);
                    self.getList(self.state.cityId,1,self.pageSize,self.state.mainJobType,self.state.subJobType,self.state.settlementType,self.state.sortType,"","","");
                })
                break;
        }
        this.type = "";
    }

    submitJobType = (value,key,num) => { //提交求职意向筛选条件
        let self = this;
        this.setState({
            status: false,
            scrollControll: true
        },function () {
            for(let i=0;i<4;i++){  //所有三角icon置为关闭状态
                self.refs["icon"+i].refs["icon"].style.backgroundImage = "";
            }
        });
        this.setState({
            mainJobType: this.state.sortDataList[num].value,
            subJobType: value
        },function () {
            Utils.replaceParamVal("mainJobType",self.state.mainJobType);
            Utils.replaceParamVal("subJobType",self.state.subJobType);
            self.getList(self.state.cityId,1,self.pageSize,self.state.mainJobType,self.state.subJobType,self.state.settlementType,self.state.sortType,"","","");
        });
        if(value == this.state.sortDataList[num].childrenList[0].value){
            this.setState({
                jobTypeName: this.state.sortDataList[num].key
            })
        }else{
            this.setState({
                jobTypeName: key
            })
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
                <Header title="全部兼职" flex="flex-end">
                    <SearchIcon order="3"/>
                </Header>
                <Iscroll dataList={lis} fetchItems={this.fetchItems} scrollControll={this.state.scrollControll} getY={this.getY} scrollY={this.state.scrollY}>
                    <Sort status={this.state.status} sortDataListTwoColumns={this.state.sortDataListTwoColumns} sortDataList={this.state.sortDataList} shadowHandle={this.shadowHandle} checkSort={this.checkSort} submitJobType={this.submitJobType}>
                        <SortItem type="city" typeName={this.state.cityName} sort="first" clickHandle={this.choose} ref="icon0"/>
                        <SortItem type="jobType" typeName={this.state.jobTypeName} clickHandle={this.choose} ref="icon1"/>
                        <SortItem type="settlement" typeName={this.state.settlementName} clickHandle={this.choose} ref="icon2"/>
                        <SortItem type="sortType" typeName={this.state.sortTypeName} sort="last" clickHandle={this.choose} ref="icon3"/>
                    </Sort>
                </Iscroll>
                <Footer page="offline"/>
            </section>
        )
    }
}