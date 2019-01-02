/**
 * Created by Administrator on 2016/9/8.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils'

class OfflineAction extends EventEmitter {
    constructor(props) {
        super(props)
    }

    getList(cityId,pageNo,pageSize,mainJobType,subJobType,settlementType,sortType,latitude,longitude,searchkey,callback) {
        $.ajax({
            url: Utils.preUrl + "api/job/offline/getList.do?cityId=" + cityId + "&mainJobType=" + mainJobType + "&subJobType=" + subJobType + "&settlementType=" + settlementType + "&sortType=" + sortType + "&pageNo=" + pageNo + "&pageSize=" + pageSize + "&latitude=" + latitude + "&longitude=" + longitude + "&searchkey=" + searchkey,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getConditions(cityId,callback) {
        $.ajax({
            url: Utils.preUrl + "api/job/offline/getConditions.do?cityId=" + cityId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getSingle(JobOfflineId,callback) {//通过线下兼职ID获取兼职信息
        $.ajax({
            url: Utils.preUrl + "api/job/offline/getSingle.do",
            dataType:'json',
            data: {
                JobOfflineId: JobOfflineId
            },
            success:function(data) {
                callback(data);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getWithInfoById(JobOfflineId,callback) {//通过线下兼职ID获取兼职投递次数和浏览量
        $.ajax({
            url: Utils.preUrl + "api/job/offline/getWithInfoById.do?JobOfflineId=" + JobOfflineId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getListByEnterpriseId(enterpriseId,callback) {//线下兼职详情中通过企业ID获取企业发布的兼职列表接口
        $.ajax({
            url: Utils.preUrl + "api/job/offline/getListByEnterpriseId.do?enterpriseId=" + enterpriseId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getHighSalaryList(cityId,pageNo,pageSize,callback) {//首页获取高薪兼职接口
        $.ajax({
            url: Utils.preUrl + "api/job/offline/getHighSalaryList.do",
            data: {
                cityId: cityId,
                pageNo: pageNo,
                pageSize: pageSize
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

    deliverResume(jobOfflineId,callback) { //线下兼职简历投递
        $.ajax({
            url: Utils.preUrl + "api/job/offline/deliverResume.do",
            dataType:'json',
            type:'POST',
            data:{
                token: Utils.token,
                jobOfflineId: jobOfflineId,
            },
            success:function(data) {
                callback(data);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    deldeliverResume(jobOfflineId,callback) { //取消兼职投递接口
        $.ajax({
            url: Utils.preUrl + "api/job/offline/deldeliverResume.do",
            dataType:'json',
            type:'POST',
            data:{
                token: Utils.token,
                jobOfflineId: jobOfflineId,
            },
            success:function(data) {
                callback(data);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getisdeliver(jobOfflineId,callback) { //查询用户是否投递了简历接口
        $.ajax({
            url: Utils.preUrl + "api/job/offline/getisdeliver.do",
            dataType:'json',
            data: {
                token: Utils.token,
                jobOfflineId: jobOfflineId
            },
            success:function(data) {
                callback(data)
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getHotWord(callback) { //获取线下兼职搜索热词
        $.ajax({
            url: Utils.preUrl + "api/job/offline/getHotWord.do",
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

module.exports = new OfflineAction();