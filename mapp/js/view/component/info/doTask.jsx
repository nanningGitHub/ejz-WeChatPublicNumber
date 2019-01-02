import React from "react";
import OnlineAction from "../../../store/main/onlineAction.js";
import UploadAction from "../../../store/main/uploadAction.js";
import Utils from "../../../store/main/utils.js";
import {Link, hashHistory} from "react-router";
import style from "./css/info.css";

import Header from '../common/header/header.jsx';
import FooterForInfo from '../common/footer/footerForInfo.jsx';
import Wrap from '../common/wrap.jsx';
import Icon from '../common/icon.jsx';
import HistoryBack from '../common/header/historyBack.jsx';

export default class DoTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobData: this.props.location.query.jobData ? JSON.parse(this.props.location.query.jobData) : {},
            jobonlineId: this.props.location.query.taskId,
            jobType: '',
            jobOrderId: '',
            restTime: "",
            photoList: ["/mapp/image/photo.jpg"],
            photoFileName: [],
        }
        this.time = "";
        this.photoList = ["/mapp/image/photo.jpg"];
        this.photoFileNameList = [];
        this.sort = 0;
    }

    componentWillMount = () => {
        this.getOrderInfo(this.state.jobonlineId);
        this.imageOrText(this.state.jobonlineId);
    }

    getOrderInfo = (jobonlineId) => {
        let self = this;
        OnlineAction.getOrderInfo(jobonlineId,function (data) {
            self.setState({
                jobOrderId: data.jobonlineOrderId
            });
            let nowTime = new Date();
            let endTime = new Date(data.createdDate + self.state.jobData.overdueTime); //计算订单的过期时间
            let t = endTime.getTime() - nowTime.getTime();
            if(t >= 0) { //结束时间大于当前时间，证明没有过期
                self.time = setInterval(function() {
                    Utils.getCountDown(data.createdDate,self.state.jobData.overdueTime,function(countDownTime){
                        self.setState({
                            restTime: countDownTime
                        })
                    },function(){
                        clearInterval(self.time);
                        Utils.historyBack();
                    })
                },1000)
            }
        })
    }

    imageOrText = (jobonlineId) => {
        let self =this;
        OnlineAction.imageOrText(jobonlineId,function (data) {
            self.setState({
                jobType: data.jobType
            })
        })
    }

    _submitImage = (e) => {
        let self = this;
        let id = e.target.id;
        this.sort = parseInt(id);
        UploadAction.osstoken(e.target.value,function (data) {
            var formData = new FormData();//构造空对象，下面用append 方法赋值。
            formData.append("key", data.fileName);
            formData.append("OSSAccessKeyId", data.accessid);
            formData.append("policy", data.policy);
            formData.append("Signature", data.signature);
            formData.append("file", $("#" + id)[0].files[0]);
            $.ajax({
                url: data.host,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (responseStr) {
                    if(self.photoList[self.sort] != "/mapp/image/photo.jpg"){
                        self.photoList[self.sort] = data.host + '/' + data.fileName;
                        self.photoFileNameList[self.sort] = data.fileName;
                    }else{
                        self.photoList[self.sort] = data.host + '/' + data.fileName;
                        self.photoFileNameList[self.sort] = data.fileName;
                        self.photoList = self.photoList.concat("/mapp/image/photo.jpg");
                    }
                    self.setState({
                        photoList: self.photoList,
                        photoFileName: self.photoFileNameList
                    })
                },
                error: function (responseStr) {
                    console.log("失败:" + JSON.stringify(responseStr));
                }
            })
        });
    }

    submitImage = () => {
        let jobonlineId = this.state.jobonlineId;
        let self = this;
        let fileNames = this.state.photoFileName.toString();
        OnlineAction.submitImageTask(jobonlineId,fileNames,function () {
            hashHistory.push({ pathname:"/onlineSuccess",query:{taskId: jobonlineId,taskPrice: self.state.jobData.taskPrice}});
        })
    }

    submitText = () => {
        let self = this;
        let submitText = this.refs.text.value;
        OnlineAction.submitTextTask(this.state.jobOrderId,submitText,function () {
            hashHistory.push({ pathname:"/onlineSuccess",query:{taskId: self.state.jobonlineId,taskPrice: self.state.jobData.taskPrice}});
        })
    }

    render() {
        return (
            <section>
                <Header title="提交任务">
                    <HistoryBack order="1"/>
                </Header>
                <section className="wrap">
                    <Wrap marginTop=".16rem">
                        <section className={style.taskContentArea}>
                            <section className={style.taskContentTitle}>
                                <Icon width=".34rem" height=".34rem" backgroundImage="url(/mapp/image/icon_task_explain.png)"/>
                                <h3>提交说明</h3>
                            </section>
                            <section className={style.taskContent}>
                                <p>{this.state.jobData.applyDesc}</p>
                            </section>
                        </section>
                    </Wrap>
                    <Wrap marginTop=".16rem">
                        <section className={style.taskContentArea}>
                            <section className={style.taskContentTitle}>
                                <Icon width=".34rem" height=".34rem" backgroundImage="url(/mapp/image/icon_task_attention.png)"/>
                                <h3>注意</h3>
                            </section>
                            <section className={style.taskContent}>
                                <p>请认真阅读任务要求，并严格按照要求完成任务，任务需要在两个小时内完成，随意填写可能被拉黑哦！</p>
                            </section>
                        </section>
                    </Wrap>
                    {
                        this.state.jobType ? (
                            <section>
                                <Wrap marginTop=".16rem">
                                    <section className={style.taskContentArea}>
                                        <section className={style.taskContentTitle}>
                                            <Icon width=".34rem" height=".34rem" backgroundImage="url(/mapp/image/icon_task_example.png)"/>
                                            <h3>图片示例</h3>
                                        </section>
                                        <section className={style.taskContent}>
                                            {
                                                this.state.jobData.urlList && this.state.jobData.urlList.length ? (
                                                    this.state.jobData.urlList.map((imgList,i) => {
                                                        return(
                                                            <section className={style.taskExampleImgBorder} key={i}>
                                                                <img src={imgList}/>
                                                            </section>
                                                        )
                                                    })
                                                ) : ("")
                                            }
                                        </section>
                                    </section>
                                </Wrap>
                                <Wrap marginTop=".16rem">
                                    <section className={style.taskContentArea}>
                                        <section className={style.taskContentTitle}>
                                            <Icon width=".34rem" height=".34rem" backgroundImage="url(/mapp/image/icon_task_upload.png)"/>
                                            <h3>上传图片</h3>
                                        </section>
                                        <section className={style.taskContent}>
                                            {
                                                this.state.photoList.map((photos,i) => {
                                                    return(
                                                        <a key={i}>
                                                            <input type="file" id={i} accept="image/*" className={style.inputFile} onChange={this._submitImage.bind(this)}/>
                                                            <img src={photos}/>
                                                        </a>
                                                    )
                                                })
                                            }
                                        </section>
                                    </section>
                                </Wrap>
                            </section>
                        ) : (
                            <Wrap marginTop=".16rem">
                                <section className={style.taskContentArea}>
                                    <section className={style.taskContentTitle}>
                                        <Icon width=".34rem" height=".34rem" backgroundImage="url(/mapp/image/icon_task_upload.png)"/>
                                        <h3>请按要求输入相关信息</h3>
                                    </section>
                                    <section className={style.taskContent}>
                                        <textarea className={style.taskContentTextArea} placeholder="请输入100字内相关信息" ref="text"></textarea>
                                    </section>
                                </section>
                            </Wrap>
                        )
                    }
                </section>
                <FooterForInfo>
                    <section className="submitButtonFooter">
                        {
                            this.state.jobType ? (
                                <a onClick={() => {this.submitImage()}}>
                                    <span>{this.state.restTime}</span>
                                    提交任务
                                </a>
                            ) : (
                                <a onClick={() => {this.submitText()}}>
                                    <span>{this.state.restTime}</span>
                                    提交任务
                                </a>
                            )
                        }
                    </section>
                </FooterForInfo>
            </section>
        )
    }
}