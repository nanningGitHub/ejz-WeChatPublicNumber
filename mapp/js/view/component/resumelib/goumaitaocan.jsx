import React from "react";
import Action from "../../../store/main/resumeLibAction.js";
import {Link} from "react-router";
import style from "./css/goumaitaocan.css";

import Header from '../common/header/header.jsx';
import FooterForInfo from '../common/footer/footerForInfo.jsx';
import Wrap from '../common/wrap.jsx';
import Icon from '../common/icon.jsx';
import HistoryBack from '../common/header/historyBack.jsx';

export default class GoumainTaoCan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //------购买简历套餐属性--------
            priceList:[],   //简历库价格列表
            payValue:16.5,  //要支付的钱数
            resumeId:1,     //要购买的简历ID
            token: window.localStorage.token ? window.localStorage.token : "",
        }
    }
    componentWillMount = () => {
        this.getList();
    }
    //初始化简历库价格列表
    getList = ()=> {
        let self = this;
        Action.getResumeList(function(data){
            self.setState({
                priceList:data.priceList?data.priceList:[]
            });
        });
    }
    //点击每个条目后复选框不选择
    onClickChoose = (resumeId)=>{
        var payValue = $("input[type='radio']:checked").val();
        console.log("resumeId=" + resumeId + ",payValue=" + payValue);
        for(var i=1;i<=5;i++){
            if(!this.refs["span_"+i]){
                continue;
            }
            this.refs["span_"+i].style.border = '1px solid #37d3cb'
            this.refs["span_"+i].style.backgroundColor = '#ffffff'
        }
        this.refs["span_"+resumeId].style.border = '1px solid #37d3cb'
        this.refs["span_"+resumeId].style.backgroundColor = '#37d3cb'
        this.setState({payValue:payValue,resumeId:resumeId});

    }
    render() {
        return (
            <section>
                <Header flex="space-between">
                    <HistoryBack order="1" onHandle={this.historyBack} />
                    <section className={style.headerWrap}>
                        <section className={style.xiaoYuanSouSou}>
                            <Link to="/resumeList">
                                校园搜搜
                            </Link>
                        </section>
                        <section className={style.resumeTaoCan}>
                            简历套餐
                        </section>
                    </section>
                    <section className={style.headerRight}>
                        <Link to="/goumaiJilu">
                            <Icon width=".5rem" height=".5rem" backgroundImage="url(/mapp/image/entry_date.png)"/>
                        </Link>
                    </section>
                </Header>
                <section className="wrap">
                    <Wrap marginTop="0.16rem">
                        <section className={style.taskContentTitle}>
                            <Icon width=".3rem" height=".3rem" backgroundImage="url(/mapp/image/attention.png)"/>
                            <h3>首次购买1份简历只需1.0元</h3>
                        </section>
                    </Wrap>
                    <Wrap marginTop=".16rem">
                        <section className={style.taskContentArea}>
                            <section className={style.taskContent}>
                                {
                                    this.state.priceList.map((data,i) => {
                                        return(
                                            (i==0)?(
                                              <label htmlFor={"radio"+data.id}>
                                    <span className={style.circleNull} ref={"span_"+data.id} >
                                        <input style={{display:'none'}} type="radio" name="radio1" id={"radio" + data.id} value={data.totalPrice} onChange={()=>{this.onClickChoose(data.id)}} />
                                    </span>
                                                  <span style={{paddingLeft:'5px'}}> {data.totalPrice}RMB/{data.count}份</span>
                                                  <span className={style.shouCiGouMai}>首次购买</span>
                                                  <span className={style.rightArea}>1.0RMB/份</span>
                                              </label>
                                          ):(
                                            <label htmlFor={"radio"+data.id}>
                                    <span className={style.circleNull} ref={"span_"+data.id} >
                                        <input style={{display:'none'}} type="radio" name="radio1" id={"radio" + data.id} value={data.totalPrice} onChange={()=>{this.onClickChoose(data.id)}} />
                                    </span>
                                                <span style={{paddingLeft:'5px'}}> {data.totalPrice}RMB/{data.count}份</span>
                                                <span className={style.rightArea}>{data.eachPrice}RMB/份</span>
                                            </label>
                                        )
                                        )
                                    })
                                }
                                <label>
                                    <span style={{float:'right'}}>
                                        <span>应付金额：</span><span className={style.rightArea} >{this.state.payValue}RMB</span>
                                    </span>
                                </label>
                            </section>
                        </section>
                    </Wrap>
                    <Wrap marginTop=".16rem">
                        <section className={style.taskContentArea}>
                            <section className={style.taskContentTitle}>
                                <Icon width=".4rem" height=".4rem" backgroundImage="url(/mapp/image/icon_task_explain.png)"/>
                                <h3>购买说明</h3>
                            </section>
                            <section className={style.taskContent}>
                                <label>1、一次购买永久生效，无需续费或再次购买；</label>
                                <label>2、虚拟服务，购买成功后不接受退款；</label>
                                <label>3、没有在线支付，可以联系工作人员通过转账购买。</label>
                            </section>
                        </section>
                    </Wrap>
                </section>
                <FooterForInfo>
                    <section className="submitButtonFooter">
                        <a href={"http://192.168.1.224:8081/api/pay/payResume.do?token="+this.state.token+"&id=" + this.state.resumeId}>立即购买</a>
                    </section>
                </FooterForInfo>
            </section>
        )
    }
}