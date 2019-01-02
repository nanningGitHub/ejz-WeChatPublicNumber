import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink, History} from "react-router";
import ResumeAction from "../../../store/main/resumeAction.js";
import style from "./css/resume.css";

import Header from '../common/header/header.jsx';
import HistoryBack from '../common/header/historyBack.jsx';
import Wrap from '../common/wrap.jsx';
import FooterForInfo from '../common/footer/footerForInfo.jsx';

export default class Intention extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobTypeList: [],
            userResume: this.props.location.state.userResume ? this.props.location.state.userResume : {}
        };
        this.data = [];
        this.dataId = [];
        this.dataMaxLength = 5;
    }

    componentWillMount = () => {
        if(this.state.userResume){
            this.data = this.state.userResume.jobIntent;
            this.dataId = this.state.userResume.jobtypeids;
            this.mainJobType();
        }else{
            hashHistory.push('/user');
        }
    }

    mainJobType = () => {
        let self = this;
        ResumeAction.mainJobType(function (data) {
            self.setState({
                jobTypeList: data.jobtypeList
            },function () {
                let intentInit = self.state.userResume.jobtypeids;
                for(let i=0;i<intentInit.length;i++){
                    self.refs[intentInit[i]].style.background = '#37d3cb'
                    self.refs[intentInit[i]].style.color = '#ffffff'
                    $('#'+intentInit[i]).prop("checked",true)
                }
            })
        })
    }

    jumpNextLink = () => {
        if(this.data.length == 0) {
            layer.open({
                content: '请选择您的求职意向',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }
        this.state.userResume.jobIntent = this.data;
        this.state.userResume.jobtypeids = this.dataId;
        this.props.history.pushState({userResume:this.state.userResume},'/editResume');
    }

    historyBack = () => {
        this.props.history.pushState({userResume:this.state.userResume},'/editResume');
    }

    handleChange = (e) => {
        let str = document.getElementsByName('intention');
        if(this.data.length == this.dataMaxLength && this.dataId.length == this.dataMaxLength){
            layer.open({
                content: '求职意向选择不能超过5个',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }
        if(e.target.checked){
            this.refs[e.target.id].style.background = '#37d3cb';
            this.refs[e.target.id].style.color = '#ffffff';
        }else{
            this.refs[e.target.id].style.background = '#dbedff';
            this.refs[e.target.id].style.color = '#333333';
        }
        this.data = [];
        this.dataId = [];
        for(let i=0;i<str.length;i++){
            if(str[i].checked){
                let dataArray = [str[i].value];
                let dataIdArray = [str[i].id];
                this.data = this.data.concat(dataArray);
                this.dataId = this.dataId.concat(dataIdArray);
            }
        }
    }

    render() {
        return (
            <section>
                <Header title="求职意向">
                    <HistoryBack onHandle={this.historyBack}/>
                </Header>
                <section className="wrapWithHeader" ref="intention">
                    <Wrap marginTop="0.16rem">
                        <section className={style.intentionArea}>
                            <p>期望职位设定</p>
                            <span>最多可选8项</span>
                        </section>
                        <section className={style.intentionCheckArea}>
                            <ul>
                                {
                                    this.state.jobTypeList.map((jobType,i) => {
                                        return(
                                            <li key={i}>
                                                <label labelFor={jobType.value} ref={jobType.value}>
                                                    <input id={jobType.value} name="intention" type="checkbox" value={jobType.key} onChange={this.handleChange.bind(this)}/>
                                                    {jobType.key}
                                                </label>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </section>
                    </Wrap>
                </section>
                <FooterForInfo>
                    <section className="submitButtonFooter">
                        <a onClick={() => {this.jumpNextLink()}}>提交</a>
                    </section>
                </FooterForInfo>
            </section>
        )
    }
}