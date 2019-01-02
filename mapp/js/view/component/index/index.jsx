import React from 'react';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink } from 'react-router';
import { Carousel } from 'antd-mobile';
import Utils from '../../../store/main/utils.js';
import IndexAction from '../../../store/main/indexAction.js';

//导入子组件
import Header from '../common/header/header';
import Location from '../common/header/location';
import SearchIcon from '../common/header/searchIcon';
import Banner from '../common/banner';
import Entry from '../common/entry';
import Wrap from '../common/wrap.jsx';
import JobList from '../common/jobList.jsx';
import Footer from '../common/footer/footer.jsx';

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bannerList: [],
            navList: [],
            navBanner: {
                toUrl: { pathname: '/' }
            },
            messageList: [],
            jobofflineList: [],
            cityName: "",
        }
    }

    componentWillMount = () => {
        let self = this;
        Utils.cityAPI(function (cityId, cityName) {
            self.showHome(cityId);
            self.setState({
                cityName: cityName
            })
        });
    }

    showHome = (cityId) => {
        let self = this;
        IndexAction.showHome(cityId, function (data) {
            let navList = [];
            for (let i = 0; i < 4; i++) {
                navList[i] = data.dataMap.navList[i];
                switch (data.dataMap.navList[i].toType) {
                    case 3: navList[i].toUrl = { pathname: '/jobOnline' };
                        break;
                    case 10: navList[i].toUrl = { pathname: '/jobOfflineList', query: { settlementType: 1 } };
                        break;
                    case 11: navList[i].toUrl = { pathname: '/jobOfflineList', query: { latitude: window.sessionStorage.getLat, longitude: window.sessionStorage.getLng } };
                        break;
                    case 12: navList[i].toUrl = { pathname: '/jobOfflineList', query: { toType: 12 } };
                        break;
                    case 14: navList[i].toUrl = { pathname: '/' };
                        break;
                }
            }
            let navBanner = data.dataMap.navList[4];
            navBanner.toUrl = { pathname: '/' };
            console.log(navBanner);
            self.setState({
                bannerList: data.dataMap.bannerList,
                navList: navList,
                navBanner: navBanner,
                messageList: data.dataMap.messageList,
                jobofflineList: data.dataMap.jobofflineList,
            })
        })
    }

    render() {
        return (
            <section>
                <Header title="e兼职" flex="flex-start">
                    <Location cityName={this.state.cityName} />
                    <SearchIcon />
                </Header>
                <section className="wrapIndex">
                    <Banner bannerList={this.state.bannerList}
                        height="3.46rem">
                        <Nav navList={this.state.navList}
                            navBanner={this.state.navBanner}
                            messageList={this.state.messageList}
                        />
                    </Banner>
                    <Wrap marginTop="4.3rem">
                        <section className="e-index-job-title flex flex-row flex-start align-center">
                            <span></span>
                            <h2>精品推荐</h2>
                        </section>
                        {/*<section>*/}
                        {/*{*/}
                        {/*this.state.jobofflineList ? (*/}
                        {/*this.state.jobofflineList.map((job,i) => {*/}
                        {/*return(*/}
                        {/*<Link to={{ pathname: '/jobInfo',query:{ article: JSON.stringify(job),isIndex: true }}}>*/}
                        {/*<JobList key={i}*/}
                        {/*index="index"*/}
                        {/*title={job.title}*/}
                        {/*imgUrl={job.bigImageUrl ? job.bigImageUrl : ""}*/}
                        {/*jobTypeStr={job.jobTypeStr.split(',')[1]}*/}
                        {/*settlementTypeStr={job.settlementTypeStr}*/}
                        {/*price={job.salaryStr}*/}
                        {/*salaryUnitStr={job.salaryUnitStr}*/}
                        {/*startDate={job.createdDate}*/}
                        {/*endDate={job.endDate}*/}
                        {/*latitude={job.latitude}*/}
                        {/*longitude={job.longitude}*/}
                        {/*/>*/}
                        {/*</Link>*/}
                        {/*)*/}
                        {/*})*/}
                        {/*) : ('')*/}
                        {/*}*/}
                        {/*</section>*/}
                    </Wrap>
                    <section className="e-index-more">
                        <Link to="/jobOffline">查看更多</Link>
                    </section>
                </section>
                <Footer page="index" />
            </section>
        )
    }
}

class Nav extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount = () => {
        console.log(this);
    }

    render() {
        return (
            <section className="e-index-entry">
                <Wrap>
                    <Entry navList={this.props.navList} />
                    <section className="e-index-banner-entry">
                        <Link to={this.props.navBanner.toUrl}>
                            <img src={this.props.navBanner.imageUrl} width="100%" />
                        </Link>
                    </section>
                    <Message messageList={this.props.messageList} />
                </Wrap>
            </section>
        )
    }
}

class Message extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className="e-message flex flex-row flex-wrap flex-start align-center">
                <section className="e-message-icon flex flex-row flex-end">
                    <span></span>
                </section>
                <section className="e-message-content">
                    <Carousel dots={false}
                        dragging={false}
                        swiping={false}
                        autoplay
                        infinite
                        vertical
                    >
                        {
                            this.props.messageList.map((message, i) => {
                                return (
                                    <p key={i}>{message.messageContent}</p>
                                )
                            })
                        }
                    </Carousel>
                </section>
            </section>
        )
    }
}