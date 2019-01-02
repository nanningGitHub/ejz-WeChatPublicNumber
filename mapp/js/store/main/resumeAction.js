/**
 * Created by Administrator on 2016/9/20.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils';

class ResumeAction extends EventEmitter {
    constructor(props) {
        super(props)
    }

    showUserResume(callback) {
        $.ajax({
            url: Utils.preUrl + "api/user/showUserResume.do",
            dataType:'json',
            data: {
                token: Utils.token
            },
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    mainJobType(callback) {
        $.ajax({
            url: Utils.preUrl + "api/job/offline/mainJobType.do",
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    jobType(callback) {
        $.ajax({
            url: Utils.preUrl + "api/job/offline/jobType.do",
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    editUserInfo(provinceId,cityId,areaId,headImageName,birthday,weight,height,degree,mobile,intro,profession,qq,gender,realName,school,startSchool,jobTypeId,email,experience,eduSituation,callback) {// app修改简历接口
        if(headImageName == ""){
            layer.open({
                content: '请上传您的生活照',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }
        if(realName == ""){
            layer.open({
                content: '姓名不规范',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(gender != 0 && gender != 1){
            layer.open({
                content: '请选择您的性别',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(birthday == ""){
            layer.open({
                content: '请选择您的出生年月',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(eduSituation != 0 && eduSituation != 1){
            layer.open({
                content: '请选择您的教育情况',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(school == ""){
            layer.open({
                content: '请填写您的学校名称',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(startSchool == ""){
            layer.open({
                content: '请填写您的入学年份',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(degree == ""){
            layer.open({
                content: '请填写您的学历',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(profession == ""){
            layer.open({
                content: '请填写您的专业',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(!jobTypeId){
            layer.open({
                content: '请选择您的期望职位',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(provinceId == "" || cityId == "" || areaId == ""){
            layer.open({
                content: '请选择您的位置',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(mobile)) || mobile == ""){
            layer.open({
                content: '手机号格式错误',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }
        $.ajax({
            url: Utils.preUrl + "api/user/editUserInfo.do",
            dataType:'json',
            type:'POST',
            traditional :true,
            data:{
                token: Utils.token,
                provinceId: provinceId,
                cityId: cityId,
                areaId: areaId,
                headImageName: headImageName,
                birthday: birthday,
                weight: weight,
                height: height,
                degree: degree,
                mobile: mobile,
                intro: intro,
                profession: profession,
                qq: qq,
                gender: gender,
                realName: realName,
                school: school,
                startSchool: startSchool,
                jobTypeId: jobTypeId,
                email: email,
                experience: experience,
                eduSituation: eduSituation
            },
            success:function(data) {
                callback(data);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    addLifePic(lifePicNames,callback) { // 上传生活照接口
        if(!lifePicNames) {
            layer.open({
                content: "请选择您要上传的生活照",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }
        $.ajax({
            url: Utils.preUrl + "api/user/addLifePic.do",
            dataType:'json',
            type:'POST',
            data:{
                token: Utils.token,
                lifePicNames: lifePicNames
            },
            success:function(data) {
                callback(data);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getQueryByKeyname(keyname,callback) { //获取学校名称接口
        $.ajax({
            url: Utils.preUrl + "api/school/getQueryByKeyname.do",
            dataType:'json',
            data: {
                keyname: keyname
            },
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    updateDegree(count,callback) { //上传生活照后修改简历完善度
        $.ajax({
            url: Utils.preUrl + "api/user/updateDegree.do",
            dataType:'json',
            data: {
                token: Utils.token,
                count: count
            },
            success:function(data) {
                callback(data);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }
}

module.exports = new ResumeAction();