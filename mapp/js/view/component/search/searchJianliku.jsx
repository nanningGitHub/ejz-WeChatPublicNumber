import React from "react";
import Action from "../../../store/main/resumeLibAction.js";
import style from "./css/search.css";

import Header from '../common/header/header.jsx';
import HistoryBack from '../common/header/historyBack.jsx';
import Wrap from '../common/wrap.jsx';
import ResumeItem from '../resumelib/resumeItem.jsx';
import Icon from '../common/icon.jsx';
import List from '../common/list.jsx';

/*
* 搜索简历库页面
* */
export default class SearchJianliku extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ellipse: {
                lineHeight: '.48rem',
                fontSize: '.24rem',
                color: '#37d3cb',
                border: '.02rem solid #37d3cb',
            },
            historyBack: {
                width: 'auto',
                order: '1'
            },
            searchKey: '',
            items: [],
            totalPage: 0,
            hotWord: [],
            searchHistory: window.sessionStorage.searchHistory ? window.sessionStorage.searchHistory.split(',') : []
        }
    }

    componentWillMount = () => {
        console.log(this.state.searchHistory)
        this.getHotWord();
    }

    getHotWord = () => {
        let self = this;
        Action.getHotWord(function(data) {
            self.setState({
                hotWord : data.schoolList
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
            this.getList(1,15,this.state.searchKey);
            this.setState({
                searchHistory: this.state.searchHistory.concat(this.state.searchKey)
            },function () {
                window.sessionStorage.setItem('searchHistory',this.state.searchHistory);
            })
        }
    }

    checkHotWords = (hotwords) => {
        this.setState({
            searchKey: hotwords
        })
        this.getList(1,15,hotwords);
    }

    getList = (pageNo,pageSize,searchkey) => {
        let self = this;
        Action.getSearchSchoolList(pageNo,pageSize,searchkey,function (data) {
            if(!data.pageList){
                layer.open({
                    content: 'e小兼找不到您的关键词',
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
            }else{
                self.setState({
                    items: data.pageList.dataList,
                    totalPage: data.pageList.totalPage
                })
            }
        })
    }

    cancelSearchHistory = () => {
        window.sessionStorage.removeItem('searchHistory');
        this.setState({
            searchHistory: []
        })
    }

    render() {
        return (
            <section>
                <Header flex="flex-start" template="search">
                    <HistoryBack style={this.state.historyBack}/>
                    <section className={style.search}>
                        <section className={style.searchIcon}>
                            <Icon width=".3rem" height=".3rem" backgroundImage="url(/mapp/image/icon_search.png)"/>
                        </section>
                        <input type="text" placeholder="输入学校名称" value={this.state.searchKey} onChange={this.changeHandle.bind(this)} onKeyDown={() => {this.searchHandle()}}/>
                    </section>
                </Header>
                {
                    this.state.items.length ? (
                        <section className="wrapWithHeader">
                            <Wrap marginTop="0.16rem">
                                {
                                    this.state.items.map((job,i) => {
                                        return(
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
                                        )
                                    })
                                }
                            </Wrap>
                        </section>
                    ) : (
                        <section className="wrapWithHeader">
                            <section className={style.guess}>
                                <h2>猜你要搜</h2>
                                <section className={style.guessList2}>
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