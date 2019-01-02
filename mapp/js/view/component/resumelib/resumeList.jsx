import React from "react";
import {Link, hashHistory} from "react-router";
import Action from "../../../store/main/resumeLibAction.js";
import Utils from "../../../store/main/utils.js";

import Header from '../common/header/header';
import SearchIcon from '../common/header/searchIcon.jsx';
import Iscroll from '../common/iscroll.jsx';
import Sort from '../common/sort.jsx';
import SortItem from '../common/sortItem.jsx';
import ResumeItem from './resumeItem.jsx';
import HistoryBack from '../common/header/historyBack';
import style from "./css/resumeList.css"

export default class ResumeList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            scrollControll: true,
            pageSize: 15,
            totalPage: 0,
            status: false,
            cityList: [],
            jobTypeList: [],
            genderList: [],
            sortTypeList: [],
            sortDataList: [],
            cityName: window.localStorage.cityName,
            jobTypeName: "职位",//"职位类型",
            gender: "性别",//"结算方式",
            sortTypeName: "排序",//"默认排序",
            sortDataListTwoColumns: false,
            jianLiShengYu:0,//简历剩余数值
            scrollY: this.props.location.query.scrollY ? this.props.location.query.scrollY : -40,
        }
        this.page = 1;
        this.cityId = window.localStorage.cityId;
        this.mainJobType = "";
        this.subJobType = "";
        this.genderType = "";
        this.sortType = "";
        this.latitude = "";
        this.longitude = "";
        this.searchkey = "";
    }

    componentWillMount = () => {
        let self = this;
        Utils.cityAPI(function(data) {
            self.getConditions(data);
        });
    }

    getConditions = (cityId) => {
        let self = this;
        Action.getConditions(cityId,function (data) {
            self.setState({
                cityList: data.openCityList,//data.cityList,
                cityName: data.openCityList[0].key,//data.cityList[0].key,
                jobTypeList: data.jobTypeList,
                genderList: data.genderList,//data.genderList,
                sortTypeList: data.sortList,//data.sortTypeList,
            })
        })
    }
    getY = (y) => {
        this.setState({
            scrollY: y
        })
    }

    changeScroll = () => {
        Utils.replaceParamVal("scrollY",this.state.scrollY);
    }
    getList = (cityId,pageNo,pageSize,mainJobType,subJobType,genderType,sortType,latitude,longitude,searchkey) => {

        let self = this;
        Action.getList(cityId,pageNo,pageSize,mainJobType,subJobType,genderType,sortType,latitude,longitude,searchkey,function (data) {
            self.setState({
                items: data.pageList.dataList?data.pageList.dataList:[],//data.jobOfflinePage.dataList,
                totalPage: data.pageList.totalPage, //data.jobOfflinePage.totalPage
                jianLiShengYu:data.jianLiShengYu,
            })
        })

    }

    fetchItems = (isRefresh,pullDownStatus,pullUpStatus,callback) => {
        let self = this;
        if (isRefresh) {

            Action.getList(this.cityId,1,this.state.pageSize * this.page,this.mainJobType,this.subJobType,this.genderType,this.sortType,this.latitude,this.longitude,this.searchkey,function (data,dataAll) {
                if(dataAll.code!=0){
                    hashHistory.push('/login')
                     return;
                }
                if (pullDownStatus == 3) {
                    self.setState({
                        items: data.pageList.dataList?data.pageList.dataList:[],//data.jobOfflinePage.dataList,
                        totalPage: data.pageList.totalPage, //data.jobOfflinePage.totalPage
                        jianLiShengYu:data.jianLiShengYu,
                    })
                    callback();
                    console.log("fetchItems if data.jianLiShengYu=" + data.jianLiShengYu);
                }
            })
        }else{
            if(this.page < this.state.totalPage){
                this.page = this.page + 1;
                Action.getList(this.cityId,this.page,this.state.pageSize,this.mainJobType,this.subJobType,this.genderType,this.sortType,this.latitude,this.longitude,this.searchkey,function (data) {
                    if (pullUpStatus == 2) {
                        self.setState({
                            items: self.state.items.concat(data.pageList.dataList?data.pageList.dataList:[])
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
                    case "_gender":
                        self.setState({
                            sortDataList: self.state.genderList,
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
                this.cityId = value;
                this.setState({
                    cityName: key
                })
                break;
            case "_gender":
                this.genderType = value;
                this.setState({
                    gender: key
                })
                break;
            case "sortType":
                this.sortType = value;
                this.setState({
                    sortTypeName: key
                })
                break;
        }
        this.getList(this.cityId,1,this.state.pageSize,this.mainJobType,this.subJobType,this.genderType,this.sortType,this.latitude,this.longitude,this.searchkey);
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
        this.mainJobType = this.state.sortDataList[num].value;
        this.subJobType = value;
        if(value == this.state.sortDataList[num].childrenList[0].value){
            this.setState({
                jobTypeName: this.state.sortDataList[num].key
            })
        }else{
            this.setState({
                jobTypeName: key
            })
        }
        this.getList(this.cityId,1,this.state.pageSize,this.mainJobType,this.subJobType,this.genderType,this.sortType,this.latitude,this.longitude,this.searchkey);
        this.type = "";
    }
    historyBack = () => {
        hashHistory.push('/')
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
                <Header flex="space-between">
                    <HistoryBack order="1" onHandle={this.historyBack} />
                    <section className={style.headerWrap}>
                        <section className={style.xiaoYuanSouSou}>
                            校园搜搜
                        </section>
                        <section className={style.resumeTaoCan}>
                            <Link  to="/jianLiTaoCan">
                                简历套餐
                            </Link>
                        </section>
                    </section>
                    <SearchIcon order="3" template="searchJianliku"/>
                </Header>
                <Iscroll dataList={lis} totalPage={this.state.totalPage} fetchItems={this.fetchItems} scrollControll={this.state.scrollControll} getY={this.getY} scrollY={this.state.scrollY}>
                    <section className={style.jianLiShengYuWrap}>
                        <section className={style.jianLiShengYuBtm}>
                        </section>
                        <section className={style.jianLiShengYuCenter}>
                            <section className={style.image}><img width="50%" src="/mapp/image/attention.png"/></section>
                            <section className={style.image}>简历剩余{this.state.jianLiShengYu}</section>
                        </section>
                    </section>
                    <Sort status={this.state.status} sortDataListTwoColumns={this.state.sortDataListTwoColumns} sortDataList={this.state.sortDataList} shadowHandle={this.shadowHandle} checkSort={this.checkSort} submitJobType={this.submitJobType}>
                        {/*北京地区*/}
                        <SortItem type="city" typeName={this.state.cityName} sort="first" clickHandle={this.choose} ref="icon0"/>
                        {/*职位*/}
                        <SortItem type="jobType" typeName={this.state.jobTypeName} clickHandle={this.choose} ref="icon1"/>
                        {/*性别*/}
                        <SortItem type="_gender" typeName={this.state.gender} clickHandle={this.choose} ref="icon2"/>
                        {/*排序*/}
                        <SortItem type="sortType" typeName={this.state.sortTypeName} sort="last" clickHandle={this.choose} ref="icon3"/>
                    </Sort>
                </Iscroll>
            </section>
        )
    }
}