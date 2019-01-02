import React from 'react';
import { Link } from 'react-router'

//导入子组件
import Icon from '../icon.jsx';

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
        switch (page){
            case 'index':
                this.setState({
                    index: "url(/mapp/image/footer_index_on.png)",
                    indexStyle: {
                        color: "#37d3cb"
                    }
                });
                break;
            case 'offline':
                this.setState({
                    offline: "url(/mapp/image/footer_offline_on.png)",
                    offlineStyle: {
                        color: "#37d3cb"
                    }
                })
                break;
            case 'online':
                this.setState({
                    online: "url(/mapp/image/footer_online_on.png)",
                    onlineStyle: {
                        color: "#37d3cb"
                    }
                });
                break;
            case 'me':
                this.setState({
                    me: "url(/mapp/image/footer_me_on.png)",
                    meStyle: {
                        color: "#37d3cb"
                    }
                });
                break;
        }
    }

    render() {
        return (
            <section className="e-footer e-footer-nav flex flex-row flex-between align-center">
                <Link to="/">
                    <span style={{ backgroundImage: this.state.index }}></span>
                    <p style={this.state.indexStyle}>首页</p>
                </Link>
                <Link to={{pathname: "/jobOffline",query: {}}}>
                    <span style={{ backgroundImage: this.state.offline }}></span>
                    <p style={this.state.offlineStyle}>线下</p>
                </Link>
                <Link to="/jobOnline">
                    <span style={{ backgroundImage: this.state.online }}></span>
                    <p style={this.state.onlineStyle}>线上</p>
                </Link>
                <Link to="/user">
                    <span style={{ backgroundImage: this.state.me }}></span>
                    <p style={this.state.meStyle}>我的</p>
                </Link>
            </section>
        )
    }
}