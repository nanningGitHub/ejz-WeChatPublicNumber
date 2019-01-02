import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from "react-router";
import ResumedAction from "../../../store/main/resumeAction.js";
import style from "./css/resume.css";

import Header from '../common/header/header.jsx';
import HeaderContent from '../common/header/headerContent.jsx';
import Wrap from '../common/wrap.jsx';
import Confirm from '../common/confirm.jsx';
import FooterForInfo from '../common/footer/footerForInfo.jsx';
import UploadImage from '../common/uploadImage.jsx';

export default class Photo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userLifePicture: this.props.location.state.userLifePicture ? this.props.location.state.userLifePicture : [],
            confirmStatus: false,
        }
    }

    componentWillMount = () => {
        if(this.state.userLifePicture.length < 12){
            this.setState({
                userLifePicture: this.state.userLifePicture.concat("/mapp/image/photo.jpg")
            })
        }
    }

    uploadImage = (imgUrl,id) => {
        let pic = this.state.userLifePicture;
        pic[id] = imgUrl;
        if(this.state.userLifePicture.length < 12 && this.state.userLifePicture.length - 1 == id){
            this.setState({
                userLifePicture: pic.concat("/mapp/image/photo.jpg")
            })
        }else{
            this.setState({
                userLifePicture: pic
            })
        }
    }

    addLifePic = () => {
        let lifePicNames = [];
        if(this.state.userLifePicture[this.state.userLifePicture.length - 1] == "/mapp/image/photo.jpg"){
            for( let i=0; i < this.state.userLifePicture.length - 1; i++ ){
                lifePicNames = lifePicNames.concat(this.state.userLifePicture[i]);
            }
        }else{
            lifePicNames = this.state.userLifePicture;
        }
        lifePicNames = lifePicNames.toString();
        ResumedAction.addLifePic(lifePicNames,function (data) {
            if(data.code == 0){
                setTimeout(function () {
                    ResumedAction.updateDegree(lifePicNames.length,function (data) {
                        layer.open({
                            content: data.msg,
                            skin: 'msg',
                            style: 'color:#ffffff;bottom:0;',
                            time: 3
                        });
                        if(data.code == 0) {
                            setTimeout(function () {
                                hashHistory.push('/myResume');
                            },3000);
                        }
                    })
                },2000);
            }else{
                layer.open({
                    content: data.msg,
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
            }
        })
    }

    historyBackAlert = () => {
        this.setState({
            confirmStatus: true
        })
    }

    closeConfirm = () => {
        this.setState({
            confirmStatus: false
        })
    }

    enterConfirm = () => {
        this.setState({
            confirmStatus: false
        })
        hashHistory.push('/myResume');
    }

    render() {
        const confirm = {
            content: '上传生活照可以提高3倍录取率，您确定跳过吗？',
            leftBtn: '取消',
            rightBtn: '确定'
        };
        return (
            <section>
                {
                    this.state.confirmStatus ? (
                        <Confirm {...confirm} onLeftClick={this.closeConfirm.bind(this)} onRightClick={this.enterConfirm.bind(this)}/>
                    ) : ('')
                }
                <Header title="上传生活照" flex="flex-end">
                    <HeaderContent title="跳过" onHandle={this.historyBackAlert}/>
                </Header>
                <section className="wrap">
                    <Wrap marginTop="0.16rem">
                        <section className={style.photoIntroduce}>
                            <p>每张生活照可增加6%简历完善度，最多上传12张</p>
                        </section>
                        <section className={style.photoArea}>
                            {
                                this.state.userLifePicture.map((photos,i) => {
                                    return(
                                        <a key={i} style={{marginTop: '.3rem'}}>
                                            <UploadImage handle={this.uploadImage} id={i} key={i}/>
                                            <img src={photos}/>
                                        </a>
                                    )
                                })
                            }
                        </section>
                    </Wrap>
                </section>
                <FooterForInfo>
                    <section className="submitButtonFooter">
                        <a onClick={() => {this.addLifePic()}}>保存</a>
                    </section>
                </FooterForInfo>
            </section>
        )
    }
}