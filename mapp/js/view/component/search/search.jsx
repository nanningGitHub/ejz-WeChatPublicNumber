import React from "react";
import {Link} from "react-router";
import Utils from "../../../store/main/utils.js";
import OfflineAction from "../../../store/main/offlineAction.js";
import style from "./css/search.css";

import Header from '../common/header/header.jsx';
import HistoryBack from '../common/header/historyBack.jsx';
import Iscroll from '../common/iscroll.jsx';
import Wrap from '../common/wrap.jsx';
import JobList from '../common/jobList.jsx';
import Icon from '../common/icon.jsx';
import List from '../common/list.jsx';

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            historyBack: {
                width: 'auto',
                order: '1'
            },
            scrollControll: true,
            searchKey: this.props.location.query.searchKey ? this.props.location.query.searchKey : '',
            items: [],
            page: this.props.location.query.page ? parseInt(this.props.location.query.page) : 1,
            hotWord: [],
            searchHistory: window.sessionStorage.searchHistory ? window.sessionStorage.searchHistory.split(',') : [],
            scrollY: this.props.location.query.scrollY ? this.props.location.query.scrollY : -40,
        };
        this.pageSize = 15;
    }

    componentWillMount = () => {
        this.getHotWord();
        if(this.state.searchKey){
            this.getList(window.sessionStorage.cityId,this.state.page,this.pageSize,'','','','','','',this.state.searchKey);
        }
    }

    getY = (y) => {
        this.setState({
            scrollY: y
        })
    }

    changeScroll = () => {
        Utils.replaceParamVal("scrollY",this.state.scrollY);
    }

    getHotWord = () => {
        let self = this;
        OfflineAction.getHotWord(function(data) {
            self.setState({
                hotWord : data.hotWords
            })
        })
    }

    changeHandle = (e) => {
        let self = this;
        this.setState({
            searchKey: e.target.value
        },function () {
            if(!self.state.searchKey){
                self.setState({
                    items: []
                })
            }
        })
    }

    searchHandle = () => {
        if(window.event.keyCode == 13){
            if(this.state.searchKey.replace(/(^s*)|(s*$)/g, "").length != 0) {
                Utils.replaceParamVal("searchKey",this.state.searchKey);
                this.getList(window.sessionStorage.cityId, 1, this.pageSize, '', '', '', '', '', '', this.state.searchKey);
                this.holdSearchHistory(this.state.searchKey);
            }else{
                return false;
            }
        }
    }

    checkHotWords = (hotwords) => {
        this.setState({
            searchKey: hotwords,
        });
        this.holdSearchHistory(hotwords);
        Utils.replaceParamVal("searchKey",hotwords);
        this.getList(window.sessionStorage.cityId,1,this.pageSize,'','','','','','',hotwords);
    }

    getList = (cityId,pageNo,pageSize,mainJobType,subJobType,settlementType,sortType,latitude,longitude,searchkey) => {
        let self = this;
        OfflineAction.getList(cityId,pageNo,pageSize,mainJobType,subJobType,settlementType,sortType,latitude,longitude,searchkey,function (data) {
            self.setState({
                items: data.jobOfflinePage.dataList,
            })
        })
    }

    holdSearchHistory = (keyWords) => { //保存查找记录
        let arr = this.state.searchHistory;
        if(keyWords.replace(/(^s*)|(s*$)/g, "").length != 0){
            if( arr.indexOf(keyWords) == -1 ){
                arr = arr.concat(keyWords);
            }else{
                return false;
            }
        }else{
            return false;
        }
        this.setState({
            searchHistory: arr
        },function () {
            window.sessionStorage.setItem('searchHistory',this.state.searchHistory);
        })
    }

    cancelSearchHistory = () => { //清空查找记录
        window.sessionStorage.removeItem('searchHistory');
        this.setState({
            searchHistory: []
        })
    }

    fetchItems = (isRefresh,pullDownStatus,pullUpStatus,callback) => {
        let self = this;
        if (isRefresh) {
            OfflineAction.getList(window.sessionStorage.cityId,1,this.pageSize * this.state.page,'','','','','','',this.state.searchKey,function (data) {
                if (pullDownStatus == 3) {
                    self.setState({
                        items: data.jobOfflinePage.dataList,
                    })
                    callback();
                }
            })
        }else{
            this.setState({
                page: this.state.page + 1
            },function () {
                OfflineAction.getList(window.sessionStorage.cityId,this.state.page,this.pageSize,'','','','','','',this.state.searchKey,function (data) {
                    if (pullUpStatus == 2) {
                        if(data.jobOfflinePage.dataList && data.jobOfflinePage.dataList.length){
                            self.setState({
                                items: self.state.items.concat(data.jobOfflinePage.dataList),
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

    render() {
        let lis = [];
        this.state.items.forEach((job, i) => {
            lis.push(
                <Link to={{ pathname: '/jobInfo',query:{ article: JSON.stringify(job)}}} onClick={() => {this.changeScroll()}}>
                    <JobList key={i}
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
                <Header flex="flex-start" template="search">
                    <HistoryBack style={this.state.historyBack}/>
                    <section className="e-header-search-bar flex flex-row flex-start align-center">
                        <span></span>
                        <input type="text" placeholder="输入岗位关键字" value={this.state.searchKey} className="flex1" onChange={this.changeHandle.bind(this)} onKeyDown={() => {this.searchHandle()}}/>
                    </section>
                </Header>
                {
                    this.state.items.length ? (
                        <Iscroll dataList={lis} fetchItems={this.fetchItems} scrollControll={this.state.scrollControll} getY={this.getY} scrollY={this.state.scrollY}/>
                    ) : (
                        <section className="wrapWithHeader">
                            <section className={style.guess}>
                                <h2>猜你要搜</h2>
                                <section className={style.guessList}>
                                    {
                                        this.state.hotWord.map((hotwords,i) => {
                                            return(
                                                <a key={i} onClick={() => {this.checkHotWords(hotwords)}}>{hotwords}</a>
                                            )
                                        })
                                    }
                                </section>
                            </section>
                            {
                                this.state.searchHistory.length ? (
                                    <section>
                                        <Wrap marginTop=".34rem">
                                            {
                                                this.state.searchHistory.map((searchHistorys,i) => {
                                                    return(
                                                        <section key={i} onClick={() => {this.checkHotWords(searchHistorys)}}>
                                                            <List title={searchHistorys} listBorder="true"/>
                                                        </section>
                                                    )
                                                })
                                            }
                                        </Wrap>
                                        <section className={style.clearSearch}>
                                            <a onClick={() => {this.cancelSearchHistory()}}>清空搜索任务</a>
                                        </section>
                                    </section>
                                ) : ('')
                            }

                        </section>
                    )
                }
            </section>
        )
    }
}