import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from "react-router";
import Action from "../../../store/main/resumeAction.js";
import style from "./css/resume.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import HeaderContent from '../common/header/headerContent.jsx'
import Wrap from '../common/wrap.jsx'
import Icon from '../common/icon.jsx'

class ResumeTitle extends React.Component {
    render() {
        return(
            <section className={style.resumeTitle}>
                <Icon width=".4rem" height=".44rem" backgroundImage={this.props.backgroundImage}/>
                <h3>{this.props.title}</h3>
            </section>
        )
    }
}

export default class MyResume extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userResume: [],
            province: '',
            city: '',
            area: '',
            jobIntent: [],
        }
    }

    componentWillMount = () => {
        this.showUserResume();
    }

    showUserResume = () => {
        let self = this;
        Action.showUserResume(function (data) {
            self.setState({
                userResume: data.userResume,
                province: data.userResume.address.province,
                city: data.userResume.address.city,
                area: data.userResume.address.area,
                jobIntent: data.userResume.jobIntent,
            })
        })
    }

    historyBack = () => {
        hashHistory.push('/user')
    }

    jumpToEditResume = () => {
        this.props.history.pushState({userResume:this.state.userResume},'/editResume');
    }

    render() {
        return (
            <section>
                <Header title="个人简历">
                    <HistoryBack onHandle={this.historyBack}/>
                    <HeaderContent title="编辑" onHandle={this.jumpToEditResume}/>
                </Header>
                <section className="wrapWithHeader" style={{paddingBottom: '.44rem'}}>
                    <Wrap marginTop="0.16rem">
                        <section className={style.resumePortait}>
                            <section className={style.outBorder}>
                                <section className={style.inBorder}>
                                    {
                                        this.state.userResume.headerFile ? (
                                            <img src={this.state.userResume.headerFile}/>
                                        ) : (
                                            <img src=""/>
                                        )
                                    }
                                </section>
                            </section>
                            <section className={style.userInfo}>
                                <h3>{this.state.userResume.realName}</h3>
                                <section className={style.userDetail}>
                                    <p>性别：<span>{this.state.userResume.gender == 1 ? '男' : '女'}</span></p>
                                    {
                                        this.state.userResume.height ? (
                                            <p>身高：<span>{this.state.userResume.height ? this.state.userResume.height : ''}</span></p>
                                        ) : ('')
                                    }
                                    <p>年龄：<span>{this.state.userResume.age}</span></p>
                                    {
                                        this.state.userResume.weight ? (
                                            <p>体重：<span>{this.state.userResume.weight ? this.state.userResume.weight : ''}</span></p>
                                        ) : ('')
                                    }
                                </section>
                            </section>
                        </section>
                        <section className={style.pictureList}>
                            {
                                this.state.userResume.userLifePicture ? (
                                    this.state.userResume.userLifePicture.map((userLifePictures,i) => {
                                        return(
                                            <img key={i} src={userLifePictures}/>
                                        )
                                    })
                                ) : ('')
                            }
                        </section>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <ResumeTitle title="学历信息" backgroundImage="url(/mapp/image/icon_degree.png)"/>
                        <section className={style.resumeDetail} style={{borderBottom: '1px solid #dbedff'}}>
                            <p><span>教育情况：</span>在校生</p>
                            <p><span>在读学校：</span>{this.state.userResume.school}</p>
                            <p><span>入学年份：</span>{this.state.userResume.startSchool}</p>
                            <p><span>学历：</span>{this.state.userResume.degree}</p>
                            <p><span>专业：</span>{this.state.userResume.profession}</p>
                        </section>
                        <ResumeTitle title="求职意向" backgroundImage="url(/mapp/image/icon_intention.png)"/>
                        <section className={style.resumeDetail}>
                            <p><span>期望职位：</span>
                                {
                                    this.state.jobIntent.map((intent,i) => {
                                        return(
                                            <span key={i} className={style.intentStyle}>{intent}</span>
                                        )
                                    })
                                }
                            </p>
                            <p><span>期望地区：</span>{this.state.province} {this.state.city} {this.state.area}</p>
                        </section>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <ResumeTitle title="自我评价" backgroundImage="url(/mapp/image/icon_evaluate.png)"/>
                        <section className={style.resumeDetail}>
                            <p>{this.state.userResume.intro ? this.state.userResume.intro : ''}</p>
                        </section>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <ResumeTitle title="工作经验" backgroundImage="url(/mapp/image/icon_experience.png)"/>
                        <section className={style.resumeDetail}>
                            <p>{this.state.userResume.experience ? this.state.userResume.experience : ''}</p>
                        </section>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <ResumeTitle title="联系方式" backgroundImage="url(/mapp/image/icon_contact.png)"/>
                        <section className={style.resumeDetail}>
                            <p><span>电话：</span>{this.state.userResume.mobile}</p>
                            {
                                this.state.userResume.email ? (
                                    <p><span>邮箱：</span>{this.state.userResume.email ?　this.state.userResume.email : ''}</p>
                                ) : ('')
                            }
                            {
                                this.state.userResume.qq ? (
                                    <p><span>QQ：</span>{this.state.userResume.qq ? this.state.userResume.qq : ''}</p>
                                ) : ('')
                            }
                        </section>
                    </Wrap>
                </section>
            </section>
        )
    }
}