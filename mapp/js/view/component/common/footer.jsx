import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from "react-router";
import style from "./css/footer.css";
import Icon from "./icon.jsx";

//导入组件样式

//导入子组件

export default class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: "url(/mapp/image/footer_index.png)",
            offline: "url(/mapp/image/footer_offline.png)",
            online: "url(/mapp/image/footer_online.png)",
            me: "url(/mapp/image/footer_me.png)",
            indexStyle: {
                color: "#bbbbbb"
            },
            offlineStyle: {
                color: "#bbbbbb"
            },
            onlineStyle: {
                color: "#bbbbbb"
            },
            meStyle: {
                color: "#bbbbbb"
            },
        }
    }

    componentWillMount = () => {
        let page = this.props.page;
        if(page == 'index'){
            this.setState({
                index: "url(/mapp/image/footer_index_on.png)",
                indexStyle: {
                    color: "#37d3cb"
                }
            })
        }else if(page == 'offline'){
            this.setState({
                offline: "url(/mapp/image/footer_offline_on.png)",
                offlineStyle: {
                    color: "#37d3cb"
                }
            })
        }else if(page == 'online'){
            this.setState({
                online: "url(/mapp/image/footer_online_on.png)",
                onlineStyle: {
                    color: "#37d3cb"
                }
            })
        }else if(page == 'me'){
            this.setState({
                me: "url(/mapp/image/footer_me_on.png)",
                meStyle: {
                    color: "#37d3cb"
                }
            })
        }
    }

    render() {
        return (
            <section className={style.wrap + " flex flex-row flex-between align-center"}>
                <Link to="/" className={style.item}>
                    <section className={style.icon}>
                        <Icon width=".48rem" height=".48rem" backgroundImage={this.state.index}/>
                    </section>
                    <p style={this.state.indexStyle}>首页</p>
                </Link>
                <Link to={{pathname: "/jobOffline",query: {}}} className={style.item}>
                    <section className={style.icon}>
                        <Icon width=".48rem" height=".48rem" backgroundImage={this.state.offline}/>
                    </section>
                    <p style={this.state.offlineStyle}>线下</p>
                </Link>
                <Link to="/jobOnline" className={style.item}>
                    <section className={style.icon}>
                        <Icon width=".48rem" height=".48rem" backgroundImage={this.state.online}/>
                        </section>
                    <p style={this.state.onlineStyle}>线上</p>
                </Link>
                <Link to="/user" className={style.item}>
                    <section className={style.icon}>
                        <Icon width=".48rem" height=".48rem" backgroundImage={this.state.me}/>
                    </section>
                    <p style={this.state.meStyle}>我的</p>
                </Link>
            </section>
        )
    }
}