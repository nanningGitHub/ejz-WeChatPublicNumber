import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from "react-router";
import Action from "../../../store/main/resumeInfoAction.js";
import style from "./css/resume.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import HeaderContent from '../common/header/headerContent.jsx'
import Wrap from '../common/wrap.jsx'
import Logo from '../common/logo.jsx'
import Icon from '../common/icon.jsx'
import FooterForInfo from '../common/footer/footerForInfo.jsx';
import  FooterButton from '../common/footerButton'

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

export default class ResumeInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userResume: [],
            province: '',
            city: '',
            area: '',
            jobIntent: [],
            userId:this.props.location.query.userId, //标识该简历的用户id
            resumeId:this.props.location.query.resumeId, //标识简历id
            resumeStatus:false,//标识是否购买过该简历
            cnt:0, //简历剩余数量
        }
    }
    componentWillMount = () => {
        this.showUserResume();
    }
    setLijiLianxi = () =>{
        let self = this;
        console.log("cnt="+ this.state.cnt +",resumeStatus=" + this.state.resumeStatus);
        if(this.state.cnt<=0 && this.state.resumeStatus==false){
            hashHistory.push('/jianLiTaoCan');
        }else{
            console.log("消耗简历数" + this.state.resumeId)
            Action.setXiaohaoJianli({
                resumeId:this.state.resumeId
            },function (data) {
                console.log(data + JSON.stringify(data));
                if(data.code==0){
                    self.setState({
                        resumeStatus:true
                    });
                    //layer.msg("购买成功");
                    console.log('购买成功')
                }else{
                    //layer.msg("购买失败");
                    console.log('购买失败')
                }
                hashHistory.push('/resumeInfo/:'+self.state.resumeId+'?resumeId='+self.state.resumeId+'&userId=' + self.state.userId)
            });
        }
    }
    showUserResume = () => {
        let self = this;
        Action.showUserResume(
            {
                userId:this.state.userId
            },function (data) {
                if(data.userResume){
                    self.setState({
                        resumeStatus:data.status,
                        cnt:data.surplusAmount,
                        userResume: data.userResume?data.userResume:[],
                        province: data.userResume.address?data.userResume.address.province:"",
                        city: data.userResume.address?data.userResume.address.city:"",
                        area: data.userResume.address?data.userResume.address.area:"",
                        jobIntent: data.userResume.jobIntent?data.userResume.jobIntent:[]
                    })
                    console.log("购买过" +data.status);

                }else{
                    console.log("data.userResume is null")
                }
        })
    }
    historyBack = () => {
        hashHistory.push('/resumeList')
    }

    render() {
        return (
            <section>
                <Header title="个人简历">
                    <HistoryBack onHandle={this.historyBack}/>
                    {
                        //如果购买过该简历那么可以投递
                        this.state.resumeStatus?
                            (
                                <HeaderContent title="投诉" url="/resumeFeedback"/>
                            )
                            :('')
                    }
                </Header>
                <section className="wrap">
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
                                <p><span>电话：</span>
                                    <span style={{color:'#37d3cb'}}>{(this.state.resumeStatus?this.state.userResume.mobile:'******')}</span>
                                </p>
                                {
                                    this.state.userResume.email ? (
                                        <p><span>邮箱：</span>
                                            <span style={{color:'#37d3cb'}}>
                                                {this.state.userResume.email ?　(this.state.resumeStatus?this.state.userResume.email:'******') : ''}</span>
                                        </p>
                                    ) : ('')
                                }
                                {
                                    this.state.userResume.qq ? (
                                        <p><span>QQ：</span>
                                            <span style={{color:'#37d3cb'}}>
                                                {this.state.userResume.qq ? (this.state.resumeStatus?this.state.userResume.qq:'******') : ''}</span>
                                        </p>
                                    ) : ('')
                                }
                            </section>
                        </Wrap>
                    </section>
                </section>
                <FooterForInfo>
                    {
                        this.state.resumeStatus?(<FooterButton name={this.state.userResume.mobile} backgroundImage="url(/mapp/image/icon_consult.png)"/>):('')
                    }
                    <section className="submitButtonFooter">
                        {
                            !this.state.resumeStatus?(
                                <a onClick={() => {this.setLijiLianxi()}}>立即联系</a>
                             ):(

                                <a href={"tel:"+this.state.userResume.mobile}>立即联系</a>
                            )
                        }
                    </section>
                </FooterForInfo>
            </section>
        )
    }
}