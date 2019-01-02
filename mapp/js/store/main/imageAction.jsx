/**
 * Created by Administrator on 2016/9/20.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from "./utils";

class ImageAction extends EventEmitter {
    constructor(props) {
        super(props)
    }

    getImageIds(fileNames,callback) {
        $.ajax({
            url: Utils.preUrl + "api/image/getImageIds.do?fileNames=" + fileNames,
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

module.exports = new ImageAction();