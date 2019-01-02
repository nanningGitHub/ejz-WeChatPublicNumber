import React from "react";
import ResumeAction from "../../../store/main/resumeAction.js";
import style from "./css/resume.css";

import Header from '../common/header/header.jsx';
import HistoryBack from '../common/header/historyBack.jsx';
import Wrap from '../common/wrap.jsx'
import Icon from '../common/icon.jsx'

export default class College extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userResume: this.props.location.state.userResume ? this.props.location.state.userResume : {},
            value: '',
            finded: true,
            schoolData: [],
        }
    }

    componentWillMount = () => {
        this.getQueryByKeyname('');
    }

    inputHandle = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    cancleHandle = () => {
        this.setState({
            value: ''
        })
        this.getQueryByKeyname('');
    }

    searchHandle = () => {
        if(window.event.keyCode == 13){
            this.getQueryByKeyname(this.state.value);
        }
    }

    getQueryByKeyname = (keyname) => {
        let self = this;
        ResumeAction.getQueryByKeyname(keyname,function (data) {
            if(data.schoolList && data.schoolList.length){
                self.setState({
                    finded: true,
                    schoolData: data.schoolList
                })
            }else{
                self.setState({
                    finded: false
                })
            }
        })
    }

    jumpNextLink = (schoolName) => {
        if(schoolName){
            this.state.userResume.school = schoolName;
            this.props.history.pushState({userResume:this.state.userResume},'/editResume');
        }else{
            layer.open({
                content: '请填写您的学校',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            })
        }
    }

    historyBack = () => {
        this.props.history.pushState({userResume:this.state.userResume},'/editResume');
    }

    render() {
        return (
            <section>
                <Header title="选择学校">
                    <HistoryBack onHandle={this.historyBack}/>
                </Header>
                <section className="wrapWithHeader">
                    <section className={style.search}>
                        <section className={style.searchIcon}>
                            <Icon width=".3rem" height=".3rem" backgroundImage="url(/mapp/image/icon_search.png)"/>
                        </section>
                        <input type="text" ref="input" placeholder="输入大学关键字" value={this.state.value} onChange={this.inputHandle.bind(this)} onKeyDown={() => {this.searchHandle()}}/>
                        <section className={style.cancelIcon} onClick={() => {this.cancleHandle()}}>
                            <Icon width=".3rem" height=".3rem" backgroundImage="url(/mapp/image/icon_cancel.png)"/>
                        </section>
                    </section>
                    {
                        this.state.finded ? (
                            <Wrap marginTop=".16rem">
                                {
                                    this.state.schoolData.map((school,i) => {
                                        return(
                                            <section className={style.schoolArea} onClick={() => {this.jumpNextLink(school)}} key={i}>
                                                <p>{school}</p>
                                            </section>
                                        )
                                    })
                                }
                            </Wrap>
                        ) : (
                            <section>
                                <section className={style.noData}>
                                    <Icon width="4.22rem" height="3.6rem" backgroundImage="url(/mapp/image/background_nodata.png)"/>
                                </section>
                                <section className={style.noDataDetail}>
                                    <p>找不到您的大学，请在下方填写</p>
                                </section>
                                <Wrap>
                                    <section className={style.searchTextArea}>
                                        <h3>填写您的学校</h3>
                                        <input type="text" ref="school"/>
                                    </section>
                                </Wrap>
                                <section className="submitButton">
                                    <a onClick={() => {this.jumpNextLink(this.refs.school.value)}}>确定</a>
                                </section>
                            </section>
                        )
                    }
                </section>
            </section>
        )
    }
}