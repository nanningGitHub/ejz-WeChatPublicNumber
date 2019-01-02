import React from 'react';
import ReactDOM from 'react-dom';
// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
import Utils from '../../store/main/utils.js'

//引入路由组件
import Index from '../component/index/index.jsx';
import Location from '../component/location/location.jsx';
import Search from '../component/search/search.jsx';
import JobOnline from '../component/jobOnline/jobOnline.jsx';
import CompanyInfo from '../component/info/conpanyInfo.jsx';
import MyTask from '../component/myTask/myTask.jsx';

import WorkRecordInfo from '../component/info/workRecordInfo.jsx';
import OnlineSuccess from '../component/success/onlineSuccess.jsx';

import TaskInfo from '../component/info/taskInfo.jsx';
import DoTask from '../component/info/doTask.jsx';

// 线下兼职
import JobOffline from '../component/jobOffline/jobOffline.jsx';
import JobInfo from '../component/info/jobInfo.jsx';
import OfflineSuccess from '../component/success/offlineSuccess.jsx';
import MyJob from '../component/myTask/MyJob.jsx';
import JobFeedback from '../component/feedback/jobFeedback.jsx';

// 注册、登录、找回密码
import Login from '../component/manage/login.jsx';
import Register from '../component/manage/register.jsx';
import ForgetPassword from '../component/manage/forgetPassword.jsx';

// 用户信息
import User from '../component/user/user.jsx';
// 简历
import MyResume from '../component/resume/myResume.jsx'
import EditResume from '../component/resume/editResume.jsx'
import Intention from '../component/resume/intention.jsx'
import Photo from '../component/resume/photo.jsx'
import College from '../component/resume/college.jsx'
// 我的钱包
import Wallet from '../component/wallet/wallet.jsx';
// 收支明细
import WalletInfo from '../component/wallet/walletInfo.jsx';
// 设置提现密码
import SetWalletPassword from '../component/wallet/setWalletPassword.jsx';
// 绑定账号
import BindWallet from '../component/wallet/bindWallet.jsx';
// 修改提现密码
import ChangeWalletPassword from '../component/wallet/changeWalletPassword.jsx';
// 找回提现密码
import FindWalletPassword from '../component/wallet/findWalletPassword.jsx';
// 我的认证
import Identity from '../component/identity/identity.jsx';
// 联系我们
import ContactUs from '../component/contact/contact.jsx'
// 职位收藏
import JobCollect from '../component/collect/jobCollect.jsx';
// 公司收藏
import CompanyCollect from '../component/collect/companyCollect.jsx';
// 系统设置
import Setting from '../component/setting/setting.jsx';
import ChangePassWord from '../component/setting/changePassword.jsx';
import Feedback from '../component/setting/feedback.jsx';
import ResumeFeedback from '../component/feedback/resumeFeedback.jsx';

    import ResumeList from '../component/resumelib/resumeList.jsx';//简历库list页
    import ResumeInfo from '../component/resumelib/resumeInfo.jsx';//简历库详情页面
    import XiaoYuanSouSou from '../component/resumelib/xiaoyuansousou.jsx';//校园搜搜单页面
    //简历套餐界面
    import JianLiTaoCan from '../component/resumelib/goumaitaocan.jsx';
    import GoumaiJilu from '../component/resumelib/goumaiJilu.jsx';
    import searchJianliku from '../component/search/searchJianliku';
// 选择城市
import City from '../component/city/city.jsx';
import SearchCity from '../component/city/searchCity.jsx';

import JobOfflineList from '../component/common/jobOfflineList.jsx';

class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <section>
                {this.props.children}
            </section>
        )
    }
}

function requireAuth(nextState, replace) {
    if (!window.localStorage.token) {
    replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname }
})
}
}

function requireAuthAndPassword(nextState, replace) {
    if (!window.localStorage.token) {
    replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname }
})
}else if (window.localStorage.ishaveTxPw == 1){
    replace({
    pathname: '/setWalletPassword',
    state: { nextPathname: nextState.location.pathname }
})
}
}

ReactDOM.render((
<Router history={hashHistory} >
    <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="/location" component={Location}/>
        <Route path="/search" component={Search}/>
        <Route path="/search" component={Search}/>
        <Route path="/myTask" component={MyTask}/>
        <Route path="/myJob/:listName" component={MyJob} onEnter={requireAuth}/>
        <Route path="/workRecordInfo/:jobId" component={WorkRecordInfo}/>
        <Route path="/user" component={User}/>

        {/*账号系统router*/}
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/forgetPassword" component={ForgetPassword}/>

        {/*简历router*/}
        <Route path="/myResume" component={MyResume}/>
        <Route path="/editResume" component={EditResume}/>
        <Route path="/intention" component={Intention}/>
        <Route path="/college" component={College}/>
        <Route path="/photo" component={Photo}/>

        {/*线下兼职router*/}
        <Route path="/jobOffline" component={JobOffline}/>
        <Route path="/jobInfo" component={JobInfo}/>
        <Route path="/offlineSuccess" component={OfflineSuccess}/>
        <Route path="/jobFeedback/:jobOfflineId" component={JobFeedback}/>

        {/*线上兼职router*/}
        <Route path="/jobOnline" component={JobOnline}/>
        <Route path="/taskInfo" component={TaskInfo}/>
        <Route path="/doTask" component={DoTask}/>
        <Route path="/onlineSuccess" component={OnlineSuccess}/>

        {/*企业router*/}
        <Route path="/companyInfo/:enterpriseId" component={CompanyInfo}/>

        {/*钱包router*/}
        <Route path="/myWallet" component={Wallet} onEnter={requireAuth}/>
        <Route path="/walletInfo" component={WalletInfo} onEnter={requireAuth}/>
        <Route path="/setWalletPassword" component={SetWalletPassword} onEnter={requireAuth}/>
        <Route path="/bindWallet" component={BindWallet} onEnter={requireAuthAndPassword}/>
        <Route path="/changeWalletPassword" component={ChangeWalletPassword} onEnter={requireAuthAndPassword}/>
        <Route path="/findWalletPassword" component={FindWalletPassword} onEnter={requireAuthAndPassword}/>

        {/*投诉反馈*/}
        <Route path="/jobFeedback" component={JobFeedback}/>
        <Route path="/resumeFeedback" component={ResumeFeedback}/>

        <Route path="/identity" component={Identity}/>
        <Route path="/contact" component={ContactUs}/>
        <Route path="/jobCollect" component={JobCollect}/>
        <Route path="/companyCollect" component={CompanyCollect}/>
        <Route path="/mySetting" component={Setting} onEnter={requireAuth}/>
        <Route path="/mySetting/changePassword" component={ChangePassWord}/>
        <Route path="/mySetting/feedback" component={Feedback}/>
            {/*简历库*/}
        <Route path="/resumeList" component={ResumeList} onEnter={requireAuth}/>
            {/*简历库详情页*/}
        <Route path="/resumeInfo/:id" component={ResumeInfo} onEnter={requireAuth}/>
        <Route path="/xiaoyuansousou" component={XiaoYuanSouSou} onEnter={requireAuth}/>
            {/*简历套餐*/}
        <Route path="/jianLiTaoCan" component={JianLiTaoCan} onEnter={requireAuth}/>
            {/*简历购买记录*/}
        <Route path="/goumaiJilu" component={GoumaiJilu} onEnter={requireAuth}/>
            {/*搜搜简历库，输入学校名称*/}
        <Route path="/searchJianliku" component={searchJianliku} onEnter={requireAuth}/>
        {/*选择城市*/}
        <Route path="/city" component={City}/>
        <Route path="/searchCity" component={SearchCity}/>

        <Route path="/jobOfflineList" component={JobOfflineList}/>
    </Route>
</Router>
), document.getElementById('App'));