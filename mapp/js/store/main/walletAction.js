/**
 * Created by Administrator on 2016/9/20.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils'

class WalletAction extends EventEmitter {
    constructor(props) {
        super(props)
    }

    getUserAmount(callback) {//我的钱包接口
        $.ajax({
            url: Utils.preUrl + "api/user/getUserAmount.do?token=" + Utils.token,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    withdrawal(password,callback) { //添加提现密码接口
        $.ajax({
            url: Utils.preUrl + "api/user/withdrawal.do?",
            dataType:'json',
            type:'POST',
            data:{
                token: Utils.token,
                password: password
            },
            success:function(data) {
                if(data.code == 0) {
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
            error : function() {
                console.log("Web False")
            }
        });
    }

    binding(alipayUsername,alipayAccount,againAlipayAccount,callback) { //绑定支付宝账号接口
        $.ajax({
            url: Utils.preUrl + "api/user/binding.do",
            dataType:'json',
            type:'POST',
            data:{
                token: Utils.token,
                alipayUsername: alipayUsername,
                alipayAccount: alipayAccount,
                againAlipayAccount: againAlipayAccount
            },
            success:function(data) {
                if(data.code == 0) {
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
            error : function() {
                console.log("Web False")
            }
        });
    }

    delBinding(password,callback) { //删除绑定的支付宝账户
        $.ajax({
            url: Utils.preUrl + "api/user/delBinding.do",
            dataType:'json',
            type:'POST',
            data:{
                token: Utils.token,
                password: password
            },
            success:function(data) {
                if(data.code == 0) {
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
            error : function() {
                console.log("Web False")
            }
        });
    }

    modifyTXPassword(oldPW,newPW,againNewPW,callback) { //修改提现密码接口
        $.ajax({
            url: Utils.preUrl + "api/user/modifyTXPassword.do",
            dataType:'json',
            type:"POST",
            data:{
                token: Utils.token,
                oldPW: oldPW,
                newPW: newPW,
                againNewPW: againNewPW
            },
            success:function(data) {
                if(data.code == 0) {
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
            error : function() {
                console.log("Web False")
            }
        });
    }

    findTXPassword(phoneNumber,validateCode,withdrawPW,callback) { //找回提现密码接口
        $.ajax({
            url: Utils.preUrl + "api/user/findTXPassword.do",
            dataType:'json',
            type:"POST",
            data:{
                token: Utils.token,
                phoneNumber: phoneNumber,
                validateCode: validateCode,
                withdrawPW: withdrawPW
            },
            success:function(data) {
                if(data.code == 0) {
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
            error : function() {
                console.log("Web False")
            }
        });
    }

    sendFindTxPWSMS(phoneNumber,callback) { //发送找回提现密码的验证码
        $.ajax({
            url: Utils.preUrl + "api/user/sendFindTxPWSMS.do",
            dataType:'json',
            type:"POST",
            data:{
                phoneNumber: phoneNumber
            },
            success:function(data) {
                layer.open({
                    content: data.msg,
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    isBinding(callback) { //判断是否已绑定支付宝账户
        $.ajax({
            url: Utils.preUrl + "api/user/isBinding.do?token=" + Utils.token,
            dataType:'json',
            success:function(data) {
                if(data.code == 0){
                    callback(data.dataMap);
                }
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    ishaveTxPw(callback) { //判断用户是否设置提现密码
        $.ajax({
            url: Utils.preUrl + "api/user/ishaveTxPw.do?token=" + Utils.token,
            dataType:'json',
            success:function(data) {
                callback(data);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getUserAccountRecord(callback) {//收支明细接口
        $.ajax({
            url: Utils.preUrl + "api/user/getUserAccountRecord.do",
            data: {
                token: Utils.token
            },
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }
}

module.exports = new WalletAction();