/**
 * Created by Administrator on 2016/9/20.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils'

class Index extends EventEmitter {
    constructor(props) {
        super(props)
    }

    getSingle(JobOfflineId,callback) {
        $.ajax({
            url: Utils.preUrl + "/job/offline/getSingle.do?JobOfflineId=" + JobOfflineId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap.jobOffline);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }
}

module.exports = new Index();