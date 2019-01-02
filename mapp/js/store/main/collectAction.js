/**
 * Created by Administrator on 2016/9/8.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils'

class CollectAction extends EventEmitter {
    constructor(props) {
        super(props)
    }

    getWatchCompanyList(page,callback) {// 获取收藏企业数据
        $.ajax({
            url: Utils.preUrl + "api/company/getWatchCompanyList.do?token=" + Utils.token + "&page=" + page,
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

    addFavoriteEnterprise(enterpriseId,callback) {// 企业收藏接口
        $.ajax({
            url: Utils.preUrl + "api/company/addFavoriteEnterprise.do",
            dataType:'json',
            type:'POST',
            data:{
                token: Utils.token,
                enterpriseId: enterpriseId
            },
            success:function(data) {
                callback(data);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    delFavoriteEnterprise(favoriteId,callback) {// 取消企业收藏接口
        $.ajax({
            url: Utils.preUrl + "api/company/delFavoriteEnterprise.do",
            dataType:'json',
            type:'POST',
            data:{
                token: Utils.token,
                favoriteId: favoriteId
            },
            success:function(data) {
                callback(data);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    userFavoriteJob(callback) {// 获取收藏职位数据
        $.ajax({
            url: Utils.preUrl + "api/user/userFavoriteJob.do?token=" + Utils.token,
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

    addFavoriteJob(jobOfflineId,callback) {// 职位收藏接口
        $.ajax({
            url: Utils.preUrl + "api/company/addFavoriteJob.do",
            dataType:'json',
            type:'POST',
            data:{
                token: Utils.token,
                jobOfflineId: jobOfflineId
            },
            success:function(data) {
                callback(data);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    delFavoriteJob(favoriteId,callback) {// 取消职位收藏接口
        $.ajax({
            url: Utils.preUrl + "api/company/delFavoriteJob.do",
            dataType:'json',
            type:'POST',
            data:{
                token: Utils.token,
                favoriteId: favoriteId
            },
            success:function(data) {
                callback(data);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getFavoriteComId(enterpriseId,callback) {// 获取用户收藏公司id的接口
        $.ajax({
            url: Utils.preUrl + "api/company/getFavoriteComId.do?token=" + Utils.token + "&enterpriseId=" + enterpriseId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getFavoriteJobId(jobOfflineId,callback) {// 获取用户收藏兼职id的接口
        $.ajax({
            url: Utils.preUrl + "api/company/getFavoriteJobId.do",
            dataType:'json',
            data: {
                token: Utils.token,
                jobOfflineId: jobOfflineId
            },
            success:function(data) {
                if(data.code == 0){
                    callback(data);
                }
            },
            error : function() {
                console.log("Web False")
            }
        });
    }
}

module.exports = new CollectAction();