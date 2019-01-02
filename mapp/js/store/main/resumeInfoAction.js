/**
 * Created by Administrator on 2016/9/20.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils';

class ResumeInfoAction extends EventEmitter {
    constructor(props) {
        super(props)
    }

    showUserResume(obj,callback) {
        $.ajax({
            url: Utils.preUrl + "api/resume/getSingle.do?token=" + Utils.token  + "&userId=" + obj.userId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    //查询用户剩余简历数量
    getSurplusResumeCnt(callback) {
        $.ajax({
            url: Utils.preUrl + "api/resume/getSurplus.do?token="+ Utils.token,
            dataType:'json',
            success:function(data) {
                callback(data)
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    //判断是否购买过该份简历
    getHasBuyResume(obj,callback) {
        $.ajax({
            url: Utils.preUrl + "api/resume/ifBuyResume.do?token="+ Utils.token+ "&resumeId=" + obj.resumeId,
            dataType:'json',
            success:function(data) {
                callback(data)
            },
            error : function() {
                console.log("Web False")
            }
        });
    }
    //立即联系消耗个人购买的简历数量
    setXiaohaoJianli(obj,callback) {
        $.ajax({
            url: Utils.preUrl + "api/resume/buyResume.do?token="+ Utils.token+ "&resumeId=" + obj.resumeId,
            dataType:'json',
            success:function(data) {
                callback(data)
            },
            error : function() {
                console.log("Web False")
            }
        });
    }
}

module.exports = new ResumeInfoAction();