import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from "react-router";
import Action from "../../../store/main/userAction";
import style from "./css/user.css";

import Wrap from '../common/wrap.jsx';
import Entry from '../common/entry.jsx';
import Icon from '../common/icon.jsx';
import List from '../common/list.jsx';
import ListInfo from '../common/listInfo.jsx';
import Footer from '../common/footer/footer.jsx';

export default class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            userAuthImage: "",
            token: window.localStorage.token ? window.localStorage.token : "",
            user: window.localStorage.user ? JSON.parse(window.localStorage.user) : "",
        }
    }

    componentWillMount = () => {
        window.scrollTo(0,0);
        this.getData();
    }

    getData = () => {
        let self = this;
        if(this.state.token){
            Action.getData(this.state.token,function (data) {
                self.setState({
                    userData: data.userData
                })
                switch (data.userData.userAuth){
                    case 0:
                        self.setState({
                            userAuthImage: "url(/mapp/image/icon_auth_no.png)"
                        });
                        break;
                    case 1:
                        self.setState({
                            userAuthImage: "url(/mapp/image/icon_auth_yes.png)"
                        });
                        break;
                    case 2:
                        self.setState({
                            userAuthImage: "url(/mapp/image/icon_auth_ing.png)"
                        });
                        break;
                    case 3:
                        self.setState({
                            userAuthImage: "url(/mapp/image/icon_auth_nopass.png)"
                        });
                        break;
                }
            })
        }else{
            return false;
        }
    }

    render() {
        const navList = [
            {title:"待录用",imageUrl:"/mapp/image/user_entry_1.png",toUrl:"/myJob/:1"},
            {title:"待上岗",imageUrl:"/mapp/image/user_entry_2.png",toUrl:"/myJob/:2"},
            {title:"待结算",imageUrl:"/mapp/image/user_entry_3.png",toUrl:"/myJob/:3"},
            {title:"已结算",imageUrl:"/mapp/image/user_entry_4.png",toUrl:"/myJob/:4"}
        ];
        return (
            <section>
                <section className="wrapWithFooter">
                    {
                        this.state.token ? (
                            this.state.user.userName ? (
                                <Link to="/myResume" className={style.userInfo}>
                                    <section className={style.outBorder}>
                                        <section className={style.inBorder}>
                                            {
                                                this.state.user.headerUrl ? (
                                                    <img src={this.state.user.headerUrl}/>
                                                ) : (
                                                    <img src=""/>
                                                )
                                            }
                                        </section>
                                    </section>
                                    <section className={style.controller}>
                                        <p className={style.userName}>{this.state.user.userName}</p>
                                        <p>{this.state.user.school}</p>
                                    </section>
                                    <Icon width=".14rem" height=".36rem" backgroundImage="url(/mapp/image/icon_go.png)"/>
                                </Link>
                            ) : (
                                <Link to="/editResume" className={style.userInfo}>
                                    <section className={style.outBorder}>
                                        <section className={style.inBorder}>
                                            {
                                                this.state.user.headerUrl ? (
                                                    <img src={this.state.user.headerUrl}/>
                                                ) : (
                                                    <img src=""/>
                                                )
                                            }
                                        </section>
                                    </section>
                                    <section className={style.controller}>
                                        <p className={style.userName}>{this.state.user.phoneNumber}</p>
                                    </section>
                                    <Icon width=".14rem" height=".36rem" backgroundImage="url(/mapp/image/icon_go.png)"/>
                                </Link>
                            )
                        ) : (
                            <Link to="/login" className={style.userInfo}>
                                <section className={style.outBorder}>
                                    <section className={style.inBorder}>
                                        <img src=""/>
                                    </section>
                                </section>
                                <section className={style.controller}>
                                    <p>登录 / 注册</p>
                                </section>
                                <Icon width=".14rem" height=".36rem" backgroundImage="url(/mapp/image/icon_go.png)"/>
                            </Link>
                        )
                    }
                    <Wrap marginTop="0.16rem">
                        <List title="我的投递" listBorder="true" href="/myJob/:0"/>
                        <Entry navList={navList}/>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <List title="我的消息" listBorder="true" href="/mySetting"/>
                        {
                            this.state.user.school ? (
                                <List title="我的简历" href="/myResume">
                                    <ListInfo color="#37d3cb" infoTitle={this.state.userData.resumedata} style="content"/>
                                </List>
                            ) : (
                                <List title="我的简历" href="/editResume">
                                    <ListInfo color="#37d3cb" infoTitle={this.state.userData.resumedata} style="content"/>
                                </List>
                            )
                        }
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <List title="我的钱包" listBorder="true" href="/myWallet">
                            <ListInfo color="#37d3cb" infoTitle={this.state.userData.wallet} style="content"/>
                        </List>
                        {
                            this.state.user.userName ? (
                                <List title="我的认证" listBorder="true" href="/identity">
                                    <section className={style.listInfo}>
                                        <section style={{width: ".8rem",height: ".3rem",backgroundImage:this.state.userAuthImage}}></section>
                                    </section>
                                </List>
                            ) : (
                                <List title="我的认证" listBorder="true" href="/editResume">
                                    <section className={style.listInfo}>
                                        <section style={{width: ".8rem",height: ".3rem",backgroundImage:this.state.userAuthImage}}></section>
                                    </section>
                                </List>
                            )
                        }
                        <List title="我的保险" listBorder="true" href="/identity"/>
                        <List title="联系我们" href="/contact"/>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <Link to="/myCollect">
                            <List title="职位收藏" listBorder="true" href="/jobCollect"/>
                        </Link>
                        <List title="公司收藏" listBorder="true" href="/companyCollect"/>
                        <List title="我要招人" listBorder="true" href="/mySetting"/>
                        <List title="系统设置" href="/mySetting"/>
                    </Wrap>
                </section>
                <Footer page="me"/>
            </section>
        )
    }
}