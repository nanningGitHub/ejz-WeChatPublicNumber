/**
 * Created by Administrator on 2016/9/8.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils'

class EnterpriseAction extends EventEmitter {
    constructor(props) {
        super(props)
    }

    getEnterprise(enterpriseId,callback) {// 获取收藏企业数据
        $.ajax({
            url: Utils.preUrl + "api/enterprise/getEnterprise.do?enterpriseId=" + enterpriseId,
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

module.exports = new EnterpriseAction();