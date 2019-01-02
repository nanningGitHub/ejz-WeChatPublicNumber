import React from "react";
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from "react-router";
import ResumeAction from "../../../store/main/resumeAction.js";
import DatePicker from "react-mobile-datepicker";
import JsonData from "../../../store/main/jsonData.js";
import style from "./css/resume.css";

import Header from '../common/header/header.jsx';
import HistoryBack from '../common/header/historyBack.jsx';
import Wrap from '../common/wrap.jsx';
import Icon from '../common/icon.jsx';
import ResumeList from './resumeList.jsx';
import Confirm from '../common/confirm.jsx';
import ScrollPicker from '../common/scrollPicker';
import RadioPicker from '../common/radioPicker.jsx';
import UploadImage from '../common/uploadImage.jsx';


export default class EditResume extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headerFile: this.props.location.state ? this.props.location.state.userResume.headerFile : "",
            realName: this.props.location.state ? this.props.location.state.userResume.realName : "",
            gender: this.props.location.state ? this.props.location.state.userResume.gender : 0,
            birthdayDate: this.props.location.state ? this.convertDate(new Date(this.props.location.state.userResume.birthdayDate), 'YYYY-MM-DD') : '1970-1-1',
            time: this.props.location.state ? new Date(this.props.location.state.userResume.birthdayDate) : new Date(1970, 0, 1),
            height: this.props.location.state && this.props.location.state.userResume.height ? this.props.location.state.userResume.height : "",
            weight: this.props.location.state && this.props.location.state.userResume.weight ? this.props.location.state.userResume.weight : "",
            eduSituation: this.props.location.state ? this.props.location.state.userResume.eduSituation : 0,
            school: this.props.location.state ? this.props.location.state.userResume.school : "",
            startSchool: this.props.location.state ? this.props.location.state.userResume.startSchool : "",
            degree: this.props.location.state ? this.props.location.state.userResume.degree : "",
            profession: this.props.location.state ? this.props.location.state.userResume.profession : "",
            jobIntent: this.props.location.state ? this.props.location.state.userResume.jobIntent : [],
            jobtypeids: this.props.location.state ? this.props.location.state.userResume.jobtypeids : [],
            province: this.props.location.state ? this.props.location.state.userResume.address ? this.props.location.state.userResume.address.province : this.props.location.state.userResume.province : '北京市',
            provinceId: this.props.location.state ? this.props.location.state.userResume.provinceId : 2,
            provinceData: [],
            city: this.props.location.state ? this.props.location.state.userResume.address ? this.props.location.state.userResume.address.city : this.props.location.state.userResume.city : '北京市',
            cityId: this.props.location.state ? this.props.location.state.userResume.cityId : 3924,
            cityData: [],
            area: this.props.location.state ? this.props.location.state.userResume.address ? this.props.location.state.userResume.address.area : this.props.location.state.userResume.area : '东城区',
            areaId: this.props.location.state ? this.props.location.state.userResume.areaId : 3,
            areaData: [],
            email: this.props.location.state && this.props.location.state.userResume.email ? this.props.location.state.userResume.email : "",
            qq: this.props.location.state && this.props.location.state.userResume.qq ? this.props.location.state.userResume.qq : "",
            mobile: this.props.location.state ? this.props.location.state.userResume.mobile : "",
            intro: this.props.location.state && this.props.location.state.userResume.intro ? this.props.location.state.userResume.intro : "" ,
            experience: this.props.location.state && this.props.location.state.userResume.experience ? this.props.location.state.userResume.experience : "",
            userLifePicture: this.props.location.state && this.props.location.state.userResume.userLifePicture ? this.props.location.state.userResume.userLifePicture : [],
            isOpen: false,
            theme: 'ios'
        };
    }

    componentWillMount = () => {
        this.getProvince();
        this.getChildrenCity(this.state.provinceId,true);
        this.getArea(this.state.cityId,true);
    }

    uploadImage = (headerFile) => {
        this.setState({
            headerFile: headerFile
        })
    }

    _input = () => {
        this.setState({
            weight: this.refs.weight.value ? this.refs.weight.value : '',
            height: this.refs.height.value ? this.refs.height.value : '',
            mobile: this.refs.mobile.value ? this.refs.mobile.value : '',
            intro: this.refs.intro.value ? this.refs.intro.value : '',
            profession: this.refs.profession.value ? this.refs.profession.value : '',
            qq: this.refs.qq.value ? this.refs.qq.value : '',
            realName: this.refs.realName.value ? this.refs.realName.value : '',
            email: this.refs.email.value ? this.refs.email.value : '',
            experience: this.refs.experience.value ? this.refs.experience.value : '',
        })
    }

    _submit = () => {
        let weight = this.state.weight;
        let height = this.state.height;
        let mobile = this.state.mobile;
        let intro = this.state.intro;
        let profession = this.state.profession;
        let qq = this.state.qq;
        let gender = this.state.gender;
        let realName = this.state.realName;
        let email = this.state.email;
        let experience = this.state.experience;
        let eduSituation = this.state.eduSituation;
        let degree = this.state.degree;
        let studyYear = this.state.startSchool;
        let school = this.state.school;
        let intentionId = this.state.jobtypeids.toString();
        let provinceId = this.state.provinceId;
        let cityId = this.state.cityId;
        let areaId = this.state.areaId;
        let birthTime = this.state.birthdayDate;
        let headImageName = this.state.headerFile;
        this.editUserInfo(provinceId,cityId,areaId,headImageName,birthTime,weight,height,degree,mobile,intro,profession,qq,gender,realName,school,studyYear,intentionId,email,experience,eduSituation)
    }

    editUserInfo = (provinceId,cityId,areaId,headImageName,birthday,weight,height,degree,mobile,intro,profession,qq,gender,realName,school,startSchool,jobTypeId,email,experience,eduSituation) => {
        let self = this;
        ResumeAction.editUserInfo(provinceId,cityId,areaId,headImageName,birthday,weight,height,degree,mobile,intro,profession,qq,gender,realName,school,startSchool,jobTypeId,email,experience,eduSituation,function (data) {
            let user = JSON.parse(window.localStorage.user);
            user.school = school;
            user.userName = realName;
            if(self.state.headerFile){
                user.headerUrl = headImageName;
            }
            window.localStorage.setItem('user',JSON.stringify(user));
            self.props.history.pushState({userLifePicture:self.state.userLifePicture},'/photo');
        })
    }

    // 出生日期选择器Start
    handleClick = () => { //打开选择器
        this.setState({ isOpen: true });
    }

    handleCancel = () => { //取消
        this.setState({ isOpen: false });
    }

    handleSelect = (time) => { //选择
        let birthdayDate = this.convertDate(time, 'YYYY-MM-DD')
        this.setState({ time: time, birthdayDate: birthdayDate, isOpen: false });
    }

    convertDate = (date, formate) => { //日期格式化
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return formate.replace(/Y+/, year).replace(/M+/, month).replace(/D+/, day).replace(/h+/, hour).replace(/m+/, minute).replace(/s+/, second);
    }
    // 出生日期选择器End

    jumpToIntention = () => {
        this.props.history.pushState({userResume:this.state},'/intention');
    }

    jumpToCollege = () => {
        this.props.history.pushState({userResume:this.state},'/college');
    }

    historyBack = () => {
        this.setState({
            confirmStatus: true,
        })
    }

    closeConfirm = () => {
        hashHistory.push('/user');
    }

    enterConfirm = () => {
        this.setState({
            confirmStatus: false,
        })
        this._submit();
    }

    selectGender = (gender) => {
        this.setState({
            gender: gender
        })
    }

    selectEduSituation = (eduSituation) => {
        this.setState({
            eduSituation: eduSituation
        })
    }

    selectStartSchool = (startSchool) => {
        this.setState({
            startSchool: startSchool
        })
    }

    selectDegree = (degree) => {
        this.setState({
            degree: degree
        })
    }

    getProvince = () => {
        let self = this;
        JsonData.getProvince(function (data) {
            let provinceArray = [];
            for (let i = 1; i < data.CityList.length; i++){
                var province = {
                    'id': data.CityList[i].id,
                    'value': data.CityList[i].fullName
                }
                provinceArray.push(province);
            }
            self.setState({
                provinceData: provinceArray
            })
        });
    }

    getChildrenCity = (provinceId,loadInit,callback) => {
        let self = this;
        JsonData.getChildrenCity(provinceId,function(data){
            let cityArray = [];
            for (let i = 0; i < data.childsList.length; i++){
                var city = {
                    'id': data.childsList[i].id,
                    'value': data.childsList[i].fullName
                }
                cityArray.push(city);
            }
            if(loadInit){
                self.setState({
                    cityData: cityArray
                })
            }else{
                self.setState({
                    city: cityArray[0].value,
                    cityId: cityArray[0].id,
                    cityData: cityArray
                },function () {
                    callback(cityArray[0].id);
                })
            }
        });
    }

    getArea = (cityId,loadInit) => {
        let self = this;
        JsonData.getArea(cityId,function (data) {
            var areaArray = [];
            for (let i = 0; i < data.childsList.length; i++){
                var area = {
                    'id': data.childsList[i].id,
                    'value': data.childsList[i].fullName
                }
                areaArray.push(area);
            }
            if(loadInit){
                self.setState({
                    areaData: areaArray
                })
            }else{
                self.setState({
                    area: areaArray[0].value,
                    areaId: areaArray[0].id,
                    areaData: areaArray
                })
            }
        });
    }

    selectProvince = (province,provinceId) => {
        let self = this;
        this.setState({
            province: province,
            provinceId: provinceId
        });
        this.getChildrenCity(provinceId,false,function (cityId) {
            self.getArea(cityId,false);
        });
    }

    selectCity = (city,cityId) => {
        this.setState({
            city: city,
            cityId: cityId
        });
        this.getArea(cityId,false);
    }

    selectArea = (area,areaId) => {
        this.setState({
            area: area,
            areaId: areaId
        });
    }

    render() {
        const confirm = {
            content: '简历内容已变更，是否保存？',
            leftBtn: '不保存',
            rightBtn: '保存'
        };
        return (
            <section>
                {
                    this.state.confirmStatus ? (
                        <Confirm {...confirm} onLeftClick={this.closeConfirm.bind(this)} onRightClick={this.enterConfirm.bind(this)}/>
                    ) : ('')
                }
                <Header title="编辑简历">
                    <HistoryBack onHandle={this.historyBack}/>
                </Header>
                <div className="wrapWithHeader">
                    <Wrap marginTop="0.16rem">
                        <section className={style.potrait}>
                            <UploadImage handle={this.uploadImage} id="portrait"/>
                            <section className={style.outBorder}>
                                <section className={style.inBorder}>
                                    <a href="javascript:;">
                                        <img src={this.state.headerFile}/>
                                    </a>
                                </section>
                            </section>
                            <section className={style.potraitSetting}>
                                <a>设置头像</a>
                            </section>
                            <Icon width=".14rem" height=".36rem" backgroundImage="url(/mapp/image/icon_go.png)"/>
                        </section>
                    </Wrap>
                    <section className={style.resumeIntroduce}>
                        <p>*为必填项  完善简历可提高10倍录取速度哦</p>
                    </section>
                    <Wrap>
                        <ResumeList needed="true" border="1px solid #dbedff" name="姓名">
                            <input type="text" placeholder="请输入您的姓名" className={style.inputArea} value={this.state.realName} ref="realName" onChange={() => {this._input()}}/>
                        </ResumeList>
                        <ResumeList needed="true" border="1px solid #dbedff" name="性别">
                            <RadioPicker init={this.state.gender}
                                         data={[{key: '男',value: 1,ref: 'radio-1'},{key: '女',value: 0, ref: 'radio-0'}]}
                                         radioName="gender"
                                         handle={this.selectGender}
                            />
                        </ResumeList>
                        <ResumeList needed="true" border="1px solid #dbedff" name="出生年月">
                            <section onClick={this.handleClick}>
                                <input type="text" placeholder="请输入真实日期" className={style.inputArea} disabled="disabled" value={this.state.birthdayDate} ref="birth"/>
                            </section>
                        </ResumeList>
                        <DatePicker
                            value={this.state.time}
                            isOpen={this.state.isOpen}
                            theme={this.state.theme}
                            min={new Date(1970, 0, 1)}
                            onSelect={this.handleSelect}
                            onCancel={this.handleCancel} />
                        <ResumeList border="1px solid #dbedff" name="身高(cm)">
                            <input type="text" placeholder="请输入您的身高" className={style.inputArea} value={this.state.height} ref="height" onChange={() => {this._input()}}/>
                        </ResumeList>
                        <ResumeList name="体重(kg)">
                            <input type="text" placeholder="请输入您的体重" className={style.inputArea} value={this.state.weight} ref="weight" onChange={() => {this._input()}}/>
                        </ResumeList>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <ResumeList needed="true" border="1px solid #dbedff" icon="true" name="教育情况">
                            <RadioPicker init={this.state.eduSituation}
                                         data={[{key: '在校生',value: 0,ref: 'radio-0'},{key: '已毕业',value: 1, ref: 'radio-1'}]}
                                         radioName="eduSituation"
                                         handle={this.selectEduSituation}
                            />
                        </ResumeList>
                        <section onClick={() => {this.jumpToCollege()}}>
                            <ResumeList needed="true" border="1px solid #dbedff" icon="true" name="在读学校">
                                <section className={style.inputArea}>
                                    {this.state.school}
                                </section>
                            </ResumeList>
                        </section>
                        <ResumeList needed="true" border="1px solid #dbedff" name="入学年份">
                            <ScrollPicker data={JsonData.studyDate()}
                                          selectName={this.state.startSchool}
                                          handle={this.selectStartSchool}
                                          placeholder="请选择您的入学年份"
                            />
                        </ResumeList>
                        <ResumeList needed="true" border="1px solid #dbedff" name="学历">
                            <ScrollPicker data={JsonData.degree}
                                          selectName={this.state.degree}
                                          handle={this.selectDegree}
                                          placeholder="请选择您的学历"
                            />
                        </ResumeList>
                        <ResumeList needed="true" name="专业">
                            <input type="text" placeholder="请输入您的专业" className={style.inputArea} value={this.state.profession} ref="profession" onChange={() => {this._input()}}/>
                        </ResumeList>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <section onClick={() => {this.jumpToIntention()}}>
                            <ResumeList needed="true" border="1px solid #dbedff" icon="true" name="期望职位">
                                <section className={style.inputArea}>
                                    <p>{this.state.jobIntent?this.state.jobIntent.toString():""}</p>
                                </section>
                            </ResumeList>
                        </section>
                        <section className={style.resumeArea}>
                            <section className={style.resumeNeeded}>
                                <p className={style.needed}>*</p>
                            </section>
                            <section className={style.address}>
                                <ScrollPicker address="true"
                                              data={this.state.provinceData}
                                              selectName={this.state.province}
                                              selectId={this.state.provinceId}
                                              handle={this.selectProvince}
                                />
                                <ScrollPicker address="true"
                                              data={this.state.cityData}
                                              selectName={this.state.city}
                                              selectId={this.state.cityId}
                                              handle={this.selectCity}
                                />
                                <ScrollPicker address="true"
                                              data={this.state.areaData}
                                              selectName={this.state.area}
                                              selectId={this.state.areaId}
                                              handle={this.selectArea}
                                />
                            </section>
                        </section>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <ResumeList border="1px solid #dbedff" name="邮箱">
                            <input type="text" placeholder="请输入您的邮箱" className={style.inputArea} value={this.state.email} ref="email" onChange={() => {this._input()}}/>
                        </ResumeList>
                        <ResumeList border="1px solid #dbedff" name="QQ">
                            <input type="text" placeholder="请输入您的QQ号" className={style.inputArea} value={this.state.qq} ref="qq" onChange={() => {this._input()}}/>
                        </ResumeList>
                        <ResumeList needed="true" name="电话">
                            <input type="text" placeholder="请输入您的手机号" className={style.inputArea} value={this.state.mobile} ref="mobile" onChange={() => {this._input()}}/>
                        </ResumeList>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <ResumeList name="自我简介">
                            <textarea placeholder="快介绍一下自己 200字以内" className={style.textArea} value={this.state.intro} ref="intro" onChange={() => {this._input()}}></textarea>
                        </ResumeList>
                    </Wrap>
                    <Wrap marginTop="0.16rem">
                        <ResumeList name="工作经验">
                            <textarea placeholder="之前做过哪些工作呢，展示一下吧 200字以内" className={style.textArea} value={this.state.experience} ref="experience" onChange={() => {this._input()}}></textarea>
                        </ResumeList>
                    </Wrap>
                </div>
                <section className={style.footer}>
                    <input type="button" value="保存并下一步" onClick={() => {this._submit()}}></input>
                </section>
            </section>
        )
    }
}