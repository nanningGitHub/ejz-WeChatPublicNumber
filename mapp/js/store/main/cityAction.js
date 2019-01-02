import Utils from './utils';

let CityAction = {
    selectCity: function(callback) {
        let self = this;
        //实例化城市查询类
        let citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city) {
                    let cityinfo = result.city;
                    self.getNowCity(cityinfo,callback);
                }
            }
        });
    },
    getNowCity: function(cityName,callback) { //获取当前定位城市的Id
        $.ajax({
            url: Utils.preUrl + "api/city/getCity.do",
            dataType:'json',
            data: {
                cityName: cityName
            },
            success:function(data) {
                callback(data.dataMap.cityId,cityName)
            },
        });
    },
    getCitysForGPS: function (keyname,callback) { //获取城市列表
        $.ajax({
            url: Utils.preUrl + "api/city/getCitysForGPS.do",
            dataType:'json',
            data: {
                keyname: keyname
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
    },
    getHotCity: function(callback) {// 获取热门城市
        $.ajax({
            url: Utils.preUrl + "api/city/getHotCity.do",
            dataType:'json',
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

module.exports = CityAction;