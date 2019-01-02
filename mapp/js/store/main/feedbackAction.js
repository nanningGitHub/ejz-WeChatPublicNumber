/**
 * Created by Administrator on 2016/9/20.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils'

class Feedback extends EventEmitter {
    constructor(props) {
        super(props)
    }

    touSuQiYe(enterpriseId,content,comment) { //投诉企业接口
        if(content == ""){
            layer.open({
                content: "请选择投诉原因",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }else if(comment.length <=0) {
            layer.open({
                content: "请填写投诉原因",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }else if (comment.length > 200) {
            layer.open({
                content: "投诉原因字数不能超过200字",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }
        $.ajax({
            url: Utils.preUrl + "api/feedback/touSuQiYe.do",
            dataType:'json',
            type:"POST",
            data:{
                token: Utils.token,
                enterpriseId: enterpriseId,
                content: content,
                comment: comment,
            },
            success:function(data) {
                if(data.code == 0){
                    layer.open({
                        content: "投诉企业成功",
                        skin: 'msg',
                        style: 'color:#ffffff;bottom:0;',
                        time: 3
                    });
                    Utils.historyBack();
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

    touSuJob(jobOfflineId,content) { //投诉兼职接口
        if(content.length <=0) {
            layer.open({
                content: "请填写投诉原因",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }else if (content.length > 200) {
            layer.open({
                content: "投诉原因字数不能超过200字",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }
        $.ajax({
            url: Utils.preUrl + "api/feedback/touSuJob.do",
            dataType:'json',
            type:"POST",
            data:{
                token: Utils.token,
                jobOfflineId: jobOfflineId,
                content: content
            },
            success:function(data) {
                if(data.code == 0){
                    layer.open({
                        content: "投诉兼职成功",
                        skin: 'msg',
                        style: 'color:#ffffff;bottom:0;',
                        time: 3
                    });
                    Utils.historyBack();
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

}

module.exports = new Feedback();