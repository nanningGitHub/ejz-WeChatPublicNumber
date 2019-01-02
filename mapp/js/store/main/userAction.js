/**
 * Created by Administrator on 2016/9/20.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils';

class UserAction extends EventEmitter {
    constructor(props) {
        super(props)
    }

    getData(token,callback) {
        $.ajax({
            url: Utils.preUrl + "api/user/getData.do?token=" + token,
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

module.exports = new UserAction();