/**
 * Created by Administrator on 2016/9/8.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils'

class MyJobAction extends EventEmitter {
    constructor(props) {
        super(props)
    }

    getJobOfflineList(page,callback) {//我的投递-全部
        $.ajax({
            url: Utils.preUrl + "api/jobRequest/getJobOfflineList.do?token=" + Utils.token + "&page=" + page,
            dataType:'json',
            success:function(data) {
                callback(data);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getToBeEmployList(page,callback) {//我的投递-待录用
        $.ajax({
            url: Utils.preUrl + "api/jobRequest/getDaiLuYongList.do?token=" + Utils.token + "&page=" + page,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getToBeGotoWorkList(page,callback) {//我的投递-待上岗
        $.ajax({
            url: Utils.preUrl + "api/jobRequest/getDaiShangGangList.do?token=" + Utils.token + "&page=" + page,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getToBeSettelAccountList(page,callback) {//我的投递-待结算
        $.ajax({
            url: Utils.preUrl + "api/jobRequest/getDaiJieSuanList.do?token=" + Utils.token + "&page=" + page,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getClosedSettleList(page,callback) {//我的投递-已结算
        $.ajax({
            url: Utils.preUrl + "api/jobRequest/getYiJieSuanList.do?token=" + Utils.token + "&page=" + page,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getWorkRecord(jobRequestId,jobId,callback) {//我的投递-上岗记录
        $.ajax({
            url: Utils.preUrl + "api/jobRequest/getShangGangJiLu.do?token=" + Utils.token + "&jobRequestId=" + jobRequestId + "&jobId=" + jobId,
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

module.exports = new MyJobAction();