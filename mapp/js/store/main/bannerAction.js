/**
 * Created by Administrator on 2016/9/20.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils';

class BannerAction extends EventEmitter {
    constructor(props) {
        super(props)
    }

    jobOffLineBanner(cityId,callback) {//线下兼职页面滚动广告接口
        $.ajax({
            url: Utils.preUrl + "api/advert/jobOffLineBanner.do?cityId=" + cityId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }

    getJobOnlineBanner(cityId,callback) {//线上兼职页面滚动广告接口
        $.ajax({
            url: Utils.preUrl + "api/advert/getJobOnlineBanner.do?cityId=" + cityId,
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

module.exports = new BannerAction();