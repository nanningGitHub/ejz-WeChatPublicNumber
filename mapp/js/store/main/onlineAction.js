/**
 * Created by Administrator on 2016/9/8.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils'

class OnlineAction extends EventEmitter {
    constructor(props) {
        super(props)
    }

    getList(cityId,pageNo,pageSize,classify,sortType,callback) {
        $.ajax({
            url: Utils.preUrl + "api/job/online/getList.do?cityId=" + cityId + "&pageNo=" + pageNo + "&pageSize=" + pageSize +"&classify=" + classify + "&sortType=" + sortType,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function(textStatus) {
                console.log(textStatus)
                console.log("Web False")
            }
        });
    }

    getConditions(callback) {
        $.ajax({
            url: Utils.preUrl + "api/job/online/getConditions.do",
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getTotalPrice(cityId,classify,callback) {//线上兼职页任务总价格接口
        $.ajax({
            url: Utils.preUrl + "api/job/online/getTotalPrice.do?cityId=" + cityId + "&classify=" + classify,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getStep(jobonlineId,callback) {//单个兼职任务说明接口
        $.ajax({
            url: Utils.preUrl + "api/job/online/getStep.do?jobonlineId=" + jobonlineId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getSingle(jobonlineId,callback) {//单个兼职任务说明接口
        $.ajax({
            url: Utils.preUrl + "api/job/online/getSingle.do?jobonlineId=" + jobonlineId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    myTask(orderStatus,pageNo,pageSize,callback) {//线上兼职我的任务接口
        $.ajax({
            url: Utils.preUrl + "api/job/online/myTask.do?token=" + Utils.token + "&orderStatus=" + orderStatus + "&pageNo=" + pageNo + "&pageSize=" + pageSize,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    beginTask(jobOnlineId,callback) {//开始任务接口
        $.ajax({
            url: Utils.preUrl + "api/job/online/beginTask.do?token=" + Utils.token + "&jobOnlineId=" + jobOnlineId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    imageOrText(jobOnlineId,callback) { //开始任务接口
        $.ajax({
            url: Utils.preUrl + "api/job/online/imageOrText.do?jobOnlineId=" + jobOnlineId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getOrderInfo(jobOnlineId,callback) { // 获取线上兼职订单id的接口
        $.ajax({
            url: Utils.preUrl + "api/job/online/getOrderInfo.do?token=" + Utils.token + "&jobOnlineId=" + jobOnlineId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    submitImageTask(jobOnlineOrderId,fileNames,callback) { //提交任务(提交的是图片)
        if(fileNames == ""){
            layer.open({
                content: "请上传任务图片！",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }
        $.ajax({
            url: Utils.preUrl + "api/job/online/submitImageTask.do",
            dataType:'json',
            type:'POST',
            data:{
                token: Utils.token,
                jobOnlineOrderId: jobOnlineOrderId,
                fileNames: fileNames
            },
            success:function(data) {
                if(data.code == 0){
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

    submitTextTask(jobOnlineOrderId,submitText,callback) { //提交任务(提交的是文字)
        if(submitText == ""){
            layer.open({
                content: "请填写相关信息！",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }
        $.ajax({
            url: Utils.preUrl + "api/job/online/submitTextTask.do",
            dataType:'json',
            type:'POST',
            data:{
                token: Utils.token,
                jobOnlineOrderId: jobOnlineOrderId,
                submitText: submitText
            },
            success:function(data) {
                if(data.code == 0){
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

    recommend(cityId,callback) { //为您推荐
        $.ajax({
            url: Utils.preUrl + "api/job/online/recommend.do?token=" + Utils.token + "&cityId=" + cityId,
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

module.exports = new OnlineAction();