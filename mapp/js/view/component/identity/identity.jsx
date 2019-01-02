import React from "react";
import {hashHistory} from "react-router";
import IdentityAction from "../../../store/main/identityAction.js";
import style from "./css/identity.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import Wrap from '../common/wrap.jsx'
import Logo from '../common/logo.jsx'
import UploadImage from '../common/uploadImage.jsx';
import FooterForInfo from '../common/footer/footerForInfo.jsx'

export default class Identity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            handImage: "/mapp/image/identity.png",
            faceImage: "/mapp/image/identity.png",
            backImage: "/mapp/image/identity.png",
            identityStatus: true,
            identityTitle: '',
        }
    }

    componentWillMount = () => {
        window.scrollTo(0,0);
        this.userAuth();
    }

    uploadImage = (imgUrl,id) => {
        switch (id){
            case 'auth_hand':
                this.setState({
                    handImage: imgUrl
                });
                break;
            case 'auth_face':
                this.setState({
                    faceImage: imgUrl
                });
                break;
            case 'auth_back':
                this.setState({
                    backImage: imgUrl
                });
                break;
        }
    }

    addUserAuth = () => {
        if(this.state.handImage == "/mapp/image/identity.png" || this.state.handImage == ""){
            layer.open({
                content: "请上传手持证件照照片",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }else if(this.state.faceImage == "/mapp/image/identity.png" || this.state.faceImage == ""){
            layer.open({
                content: "请上传证件照正面照片",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }else if(this.state.backImage == "/mapp/image/identity.png" || this.state.backImage == ""){
            layer.open({
                content: "请上传证件照背面照片",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }
        IdentityAction.addUserAuth(this.state.handImage,this.state.faceImage,this.state.backImage,function (data) {
            layer.open({
                content: data.msg,
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            if(data.code == 0){
                setTimeout(function () {
                    hashHistory.push('/user');
                },3000);
            }
        })
    }

    userAuth = () => {
        let self = this;
        IdentityAction.userAuth(function (data) {
            if(data.userAuth) {
                if (data.userAuth.authStatus == 0 || data.userAuth.authStatus == 3) {
                    if (data.userAuth.authStatus == 3) {
                        layer.open({
                            content: "您的认证审核未通过，请重新认证",
                            skin: 'msg',
                            style: 'color:#ffffff;bottom:0;',
                            time: 3
                        });
                    }
                }else if (data.userAuth.authStatus == 1){
                    self.setState({
                        handImage: data.userAuth.handImageUrl,
                        faceImage: data.userAuth.identityFrontImageUrl,
                        backImage: data.userAuth.identityBackImageUrl,
                        identityStatus: false
                    })
                }else {
                    self.setState({
                        handImage: data.userAuth.handImageUrl,
                        faceImage: data.userAuth.identityFrontImageUrl,
                        backImage: data.userAuth.identityBackImageUrl,
                        identityStatus: false,
                        identityTitle: '审核中'
                    })
                }
            }
        })
    }

    render() {
        return (
            <section>
                <Header title="身份认证">
                    <HistoryBack/>
                </Header>
                <section className="wrap">
                    <Wrap marginTop="0.16rem">
                        <section className={style.photoIntroduce}>
                            <p>上传本人手持身份证照片（正面）</p>
                        </section>
                        <section className={style.photoArea}>
                            {
                                this.state.identityStatus ? (
                                    <a href="javascript:;">
                                        <img src={this.state.handImage}/>
                                        <UploadImage handle={this.uploadImage} id="auth_hand"/>
                                    </a>
                                ) : (
                                    <a href="javascript:;">
                                        <img src={this.state.handImage}/>
                                        {
                                            this.state.identityTitle ? (
                                                <section className={style.authStatusShadow}>
                                                    <p>{this.state.identityTitle}</p>
                                                </section>
                                            ) : ('')
                                        }
                                    </a>
                                )
                            }
                            <Logo width="3.04rem" height="2.16rem" imageUrl="/mapp/image/identity-hand.png"/>
                        </section>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <section className={style.photoIntroduce}>
                            <p>上传本人身份证正面照</p>
                        </section>
                        <section className={style.photoArea}>
                            {
                                this.state.identityStatus ? (
                                    <a href="javascript:;">
                                        <img src={this.state.faceImage}/>
                                        <UploadImage handle={this.uploadImage} id="auth_face"/>
                                    </a>
                                ) : (
                                    <a href="javascript:;">
                                        <img src={this.state.faceImage}/>
                                        {
                                            this.state.identityTitle ? (
                                                <section className={style.authStatusShadow}>
                                                    <p>{this.state.identityTitle}</p>
                                                </section>
                                            ) : ('')
                                        }
                                    </a>
                                )
                            }
                            <Logo width="3.04rem" height="2.16rem" imageUrl="/mapp/image/identity-face.png"/>
                        </section>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <section className={style.photoIntroduce}>
                            <p>上传本人身份证背面照</p>
                        </section>
                        <section className={style.photoArea}>
                            {
                                this.state.identityStatus ? (
                                    <a href="javascript:;">
                                        <img src={this.state.backImage}/>
                                        <UploadImage handle={this.uploadImage} id="auth_back"/>
                                    </a>
                                ) : (
                                    <a href="javascript:;">
                                        <img src={this.state.backImage}/>
                                        {
                                            this.state.identityTitle ? (
                                                <section className={style.authStatusShadow}>
                                                    <p>{this.state.identityTitle}</p>
                                                </section>
                                            ) : ('')
                                        }
                                    </a>
                                )
                            }
                            <Logo width="3.04rem" height="2.16rem" imageUrl="/mapp/image/identity-back.png"/>
                        </section>
                    </Wrap>
                </section>
                {
                    this.state.identityStatus ? (
                        <FooterForInfo>
                            <section className="submitButtonFooter">
                                <a onClick={() => {this.addUserAuth()}}>提交审核</a>
                            </section>
                        </FooterForInfo>
                    ) : ('')
                }
            </section>
        )
    }
}