/**
 * Created by Administrator on 2016/9/20.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils';

class UploadAction extends EventEmitter {
    constructor(props) {
        super(props)
    }

    osstoken(fileName,callback) {
        $.ajax({
            url: Utils.preUrl + "ali/osstoken.do?fileName=" + fileName,
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

module.exports = new UploadAction();