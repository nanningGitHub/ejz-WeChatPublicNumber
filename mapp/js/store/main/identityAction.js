/**
 * Created by Administrator on 2016/9/20.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils'

class Identity extends EventEmitter {
    constructor(props) {
        super(props)
    }

    addUserAuth(shouChiFile,frontFile,backFile,callback) {
        if(shouChiFile == "/mapp/image/identity.png"){
            layer.open({
                content: '请上传手持身份证照片',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(frontFile == "/mapp/image/identity.png"){
            layer.open({
                content: '请上传身份证正面照片',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }else if(backFile == "/mapp/image/identity.png"){
            layer.open({
                content: '请上传身份证背面照片',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false
        }
        $.ajax({
            url: Utils.preUrl + "api/user/addUserAuth.do",
            dataType:'json',
            type: 'POST',
            data: {
                token: Utils.token,
                shouChiFile: shouChiFile,
                frontFile: frontFile,
                backFile: backFile
            },
            success:function(data) {
                callback(data)
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    userAuth(callback) {
        $.ajax({
            url: Utils.preUrl + "api/user/userAuth.do?token=" + Utils.token,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap)
            },
            error : function() {
                console.log("Web False")
            }
        });
    }
}

module.exports = new Identity();