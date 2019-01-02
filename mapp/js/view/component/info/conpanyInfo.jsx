import React from "react";
import EnterpriseAction from "../../../store/main/enterpriseAction.js";
import OfflineAction from "../../../store/main/offlineAction.js";
import CollectAction from "../../../store/main/collectAction.js";
import style from "../info/css/info.css";

import Header from '../common/header/header.jsx';
import Wrap from '../common/wrap.jsx';
import Ellipse from '../common/ellipse.jsx';
import List from '../common/list.jsx';
import ListInfo from '../common/listInfo.jsx';
import HistoryBack from '../common/header/historyBack.jsx';
import HeaderContent from '../common/header/headerContent.jsx';
import FooterForInfo from '../common/footer/footerForInfo.jsx';
import FooterButton from '../common/footerButton.jsx';

export default class CompanyInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ellipse: {
                marginLeft: '.16rem',
                lineHeight: '.34rem',
                fontSize: '.22rem',
                color: '#37d3cb',
                border: '.02rem solid #37d3cb',
            },
            ellipseTwo: {
                marginTop: '.42rem',
                marginBottom: '.38rem',
                lineHeight: '.34rem',
                fontSize: '.22rem',
                color: '#ffffff',
                backgroundColor: '#515d6e'
            },
            enterpriseId: '',
            enterprise: [],
            jobOfflinePage: [],
            favoriteComId: '',
            status: -1,
        }
        this.collectStatus = true
    }

    componentWillMount = () => {
        let enterpriseId = this.props.params.enterpriseId.substr(1);
        this.setState({
            enterpriseId: enterpriseId,
        })
        this.getEnterprise(enterpriseId);
        this.getListByEnterpriseId(enterpriseId);
        this.getFavoriteComId(enterpriseId);
    }

    getEnterprise = (enterpriseId) => {
        let self = this;
        EnterpriseAction.getEnterprise(enterpriseId,function (data) {
            self.setState({
                enterprise: data.enterprise
            });
        });
    }

    getListByEnterpriseId = (enterpriseId) => {
        let self = this;
        OfflineAction.getListByEnterpriseId(enterpriseId,function (data) {
            self.setState({
                jobOfflinePage: data.jobOfflinePage.dataList
            });
        });
    }

    circleGetFavoriteComId = (enterpriseId) => {
        let self = this;
        setTimeout(function () {
            CollectAction.getFavoriteComId(enterpriseId, function (data) {
                if(data.status == -1){
                    self.circleGetFavoriteComId(enterpriseId);
                }else{
                    self.collectStatus = true;
                    self.setState({
                        favoriteComId: data.favoriteComId,
                        status: data.status
                    })
                    layer.open({
                        content: "收藏成功",
                        skin: 'msg',
                        style: 'color:#ffffff;bottom:0;',
                        time: 3
                    });
                }
            })
        },300)
    }

    addFavoriteEnterprise = () => {
        if(this.collectStatus){
            this.collectStatus = false;
            let self = this;
            CollectAction.addFavoriteEnterprise(this.state.enterpriseId,function (data) {
                if(data.code == 0 ){
                    self.circleGetFavoriteComId(self.state.enterpriseId)
                }else{
                    layer.open({
                        content: data.msg,
                        skin: 'msg',
                        style: 'color:#ffffff;bottom:0;',
                        time: 3
                    });
                    self.collectStatus = true;
                }
            });
        }else{
            return false;
        }
    }

    delFavoriteEnterprise = () => {
        if(this.collectStatus) {
            this.collectStatus = false;
            let self = this;
            CollectAction.delFavoriteEnterprise(this.state.favoriteComId, function (data) {
                if (data.code == 0) {
                    self.setState({
                        status: -1,
                    })
                }
                layer.open({
                    content: data.msg,
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
                self.collectStatus = true;
            })
        }else{
            return false
        }
    }

    getFavoriteComId = (enterpriseId) => {
        let self = this;
        CollectAction.getFavoriteComId(enterpriseId,function (data) {
            self.collectStatus = true;
            self.setState({
                favoriteComId: data.favoriteComId,
                status: data.status
            })
        })
    }

    render() {
        return (
            <section>
                <Header title="公司详情" flex="flex-start">
                    <HistoryBack order="1"/>
                    <HeaderContent title="投诉" url={{ pathname: "/enterpriseFeedback", query: {enterpriseId: this.state.enterpriseId}}}/>
                </Header>
                <section className="wrap">
                    <Wrap marginTop="0.16rem">
                        <a className={style.item}>
                            <section className={style.logo}>
                                <img style={{width:'1.1rem',height:'1.1rem'}} src={this.state.enterprise.logoUrl}/>
                            </section>
                            <section className={style.textArea}>
                                <section className={style.titleArea}>
                                    <h3 className={style.title}>{this.state.enterprise.name}</h3>
                                </section>
                                <section className={style.descriptionArea}>
                                    {
                                        this.state.enterprise == 0 ? (
                                            <Ellipse name="未认证" style={this.state.ellipseTwo}/>
                                        ) : (
                                            this.state.enterprise == 1 ? (
                                                <Ellipse name="审核中" style={this.state.ellipseTwo}/>
                                            ) : (
                                                this.state.enterprise == 2 ? (
                                                    <Ellipse name="已认证" style={this.state.ellipseTwo}/>
                                                ) : (
                                                    <Ellipse name="认证失败" style={this.state.ellipseTwo}/>
                                                )
                                            )
                                        )
                                    }

                                </section>
                            </section>
                        </a>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <section className={style.infoAreaWithBorder}>
                            <p>规模：{this.state.enterprise.scale}</p>
                            <p>性质：{this.state.enterprise.nature}</p>
                            <p>行业：{this.state.enterprise.industry}</p>
                            <p>地址：{this.state.enterprise.address}</p>
                        </section>
                        <section className={style.infoArea}>
                            <p>公司简介</p>
                            <p className={style.infoMain}>{this.state.enterprise.intro}</p>
                        </section>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <List title="已发布兼职" listBorder="true" style="1"/>
                        {
                            this.state.jobOfflinePage.map((job,i) => {
                                return(
                                    <List title={job.title} listBorder="true" style="1" href={{ pathname: '/jobInfo',query:{ article: JSON.stringify(job) }}}>
                                        {
                                            job.settlementTypeStr ? (
                                                <p className={style.settlementType}>{job.settlementTypeStr + "结"}</p>
                                            ) : ("")
                                        }
                                        {
                                            job.salaryUnitStr == "面议" ? (
                                                <ListInfo info={job.salaryUnitStr} color="#666666" colorInfo="#fdba32" font=".28rem" style="content" />
                                            ) : (
                                                <ListInfo infoTitle={"RMB/" + job.salaryUnitStr} info={job.salary} color="#666666" colorInfo="#fdba32" font=".28rem" style="content" />
                                            )
                                        }
                                    </List>
                                )
                            })
                        }
                    </Wrap>
                </section>
                <FooterForInfo>
                    {
                        this.state.status == 1 ? (
                            <FooterButton name="收藏公司" backgroundImage="url(/mapp/image/icon_attention.png)" clickHandle={this.delFavoriteEnterprise}/>
                        ) : (
                            <FooterButton name="收藏公司" backgroundImage="url(/mapp/image/icon_attention_no.png)" clickHandle={this.addFavoriteEnterprise}/>
                        )
                    }
                </FooterForInfo>
            </section>
        )
    }
}