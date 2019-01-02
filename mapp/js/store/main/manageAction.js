var EventEmitter = require('events').EventEmitter;
import Utils from './utils'

class ManageAction extends EventEmitter {
    constructor(props) {
        super(props)
        this.allData = null;
    }

    register(phoneNumber,password,validateCode,inviteCode,agreement,callback) { //用户注册
        if(phoneNumber == ""){
            layer.open({
                content: '亲，请填写手机号码哦~~~',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneNumber))){
            layer.open({
                content: '格式错误',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(password == ""){
            layer.open({
                content: '亲，请输入您的密码哦~',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(!agreement){
            layer.open({
                content: '请阅读并同意《用户协议》',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }
        $.ajax({
            url: Utils.preUrl + "api/user/register.do?phoneNumber=" + phoneNumber + "&password=" + password + "&validateCode=" + validateCode + "&inviteCode=" + inviteCode,
            dataType:'json',
            success:function(data) {
                if(data.code == 0){
                    callback(data);
                }else if(data.code == 1){
                    layer.open({
                        content: data.msg,
                        skin: 'msg',
                        style: 'color:#ffffff;bottom:0;',
                        time: 3
                    });
                }
            },
            error : function(data) {
                console.log("Web False")
            }
        });
    }

    sendRegisterSMS(phoneNumber,callback) { //app发送注册验证码
        if(phoneNumber == ""){
            layer.open({
                content: '亲，请填写手机号码哦~~~',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneNumber))){
            layer.open({
                content: '格式错误',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }
        $.ajax({
            url: Utils.preUrl + "api/user/sendRegisterSMS.do?phoneNumber=" + phoneNumber,
            dataType:'json',
            success:function(data) {
                if(data.code == 0){
                    layer.open({
                        content: data.msg,
                        skin: 'msg',
                        style: 'color:#ffffff;bottom:0;',
                        time: 3
                    });
                    callback(data);
                }else if(data.code == 1){
                    layer.open({
                        content: data.msg,
                        skin: 'msg',
                        style: 'color:#ffffff;bottom:0;',
                        time: 3
                    });
                }
            },
            error : function(data) {
                console.log("Web False")
            }
        });
    }

    findPassword(phoneNumber,validateCode,password,callback) { //app忘记密码找回
        if(phoneNumber == ""){
            layer.open({
                content: '亲，请填写手机号码哦~~~',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneNumber))){
            layer.open({
                content: '格式错误',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(password == ""){
            layer.open({
                content: '亲，请输入您的密码哦~',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }
        $.ajax({
            url: Utils.preUrl + "api/user/findPassword.do?phoneNumber=" + phoneNumber + "&validateCode=" + validateCode + "&password=" + password,
            dataType:'json',
            success:function(data) {
                callback(data);
            },
            error : function(data) {
                console.log("Web False")
            }
        });
    }

    sendFindBackSMS(phoneNumber,callback) { //app发送找回密码验证码
        if(phoneNumber == ""){
            layer.open({
                content: '亲，请填写手机号码哦~~~',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneNumber))){
            layer.open({
                content: '格式错误',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }
        $.ajax({
            url: Utils.preUrl + "api/user/sendFindBackSMS.do?phoneNumber=" + phoneNumber,
            dataType:'json',
            success:function(data) {
                callback(data);
            },
            error : function(data) {
                console.log("Web False")
            }
        });
    }

    modifyPassword(phoneNumber,nowPassword,newPassword,callback) { //app修改密码
        if(nowPassword == ""){
            layer.open({
                content: '请输入当前密码',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(newPassword == ""){
            layer.open({
                content: '请输入新密码',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(newPassword == nowPassword){
            layer.open({
                content: '请勿使用旧密码',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }
        $.ajax({
            url: Utils.preUrl + "api/user/modifyPassword.do?token=" + Utils.token + "&phoneNumber=" + phoneNumber + "&nowPassword=" + nowPassword + "&newPassword=" + newPassword,
            dataType:'json',
            success:function(data) {
                if(data.code == 0){
                    callback(data);
                }else{
                    layer.open({
                        content: data.msg,
                        skin: 'msg',
                        style: 'color:#ffffff;bottom:0;',
                        time: 3
                    })
                }
            },
            error : function(data) {
                console.log("Web False")
            }
        });
    }

    login(phoneNumber,password,callback) {
        if(phoneNumber == ""){
            layer.open({
                content: '亲，请填写手机号码哦~~~',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneNumber))){
            layer.open({
                content: '格式错误',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(password == ""){
            layer.open({
                content: '亲，请输入您的密码哦~',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }
        $.ajax({
            url: Utils.preUrl + "api/user/login.do?phoneNumber=" + phoneNumber + "&password=" + password,
            dataType: 'JSON',
            success: function(data) {
                if(data.code == 0){
                    Utils.ishaveTxPw(data.dataMap.token,function (dataCode) {
                        window.localStorage.setItem('ishaveTxPw',dataCode)
                    })
                    callback(data.dataMap);
                }else{
                    layer.open({
                        content: data.msg,
                        skin: 'msg',
                        style: 'color:#ffffff;bottom:0;',
                        time: 3
                    });
                }
            },
            error: function(data) {
                console.log("web false");
            }
        });
    }
}

module.exports = new ManageAction();