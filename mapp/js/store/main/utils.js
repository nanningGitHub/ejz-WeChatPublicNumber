var Utils = {
    // preUrl: "http://localtestapi.ejzhi.com/",
    preUrl: "http://openapi.ejzhi.com/",
    token: window.localStorage.token ? window.localStorage.token : '',
    historyBack: function (){
        window.history.back(-1)
    },
    getLocalTime: function (now){
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var date = now.getDate();
        if( month < 10 ){
            month = '0' + month
        }
        if( date < 10 ){
            date = '0' + date
        }
        return year+"-"+month+"-"+date;
    },
    getTime: function (now) {
        var time = new Date(now);
        var hour = time.getHours();
        var minute = time.getMinutes();
        if (minute < 10) {
            minute = '0' + minute
        }
        return hour + ":" + minute;
    },
    cityAPI: function (callback) { //高德API定位当前城市
        if(!window.sessionStorage.cityId){
            let self = this;
            //实例化城市查询类
            var citysearch = new AMap.CitySearch();
            //自动获取用户IP，返回当前城市
            citysearch.getLocalCity(function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.city) {
                        var cityinfo = result.city;
                        self.getCity(cityinfo,callback);
                    }
                } else {
                    self.getCity('北京市',callback);
                }
            });
        }else{
            callback(window.sessionStorage.cityId,window.sessionStorage.cityName);
        }
    },
    getCity: function (cityName,callback) {//获取当前定位城市的Id
        $.ajax({
            url: this.preUrl + "api/city/getCity.do?cityName=" + cityName,
            dataType:'json',
            success:function(data) {
                let cityId = data.dataMap.cityId;
                if(parseInt(cityId)==0){
                    cityId = 3924;
                }
                window.sessionStorage.setItem('cityId', cityId);
                window.sessionStorage.setItem('cityName', cityName);
                callback(data.dataMap.cityId,cityName);
            },
            error : function() {
                window.sessionStorage.setItem('cityId', 3924);
                window.sessionStorage.setItem('cityName', '北京市');
                callback(3924,'北京市');
            }
        });
    },
    computeDistance: function (myLatitude,myLongitude,latitude,longitude) { //计算距离
        var startLatRads = this.degreesToRadians(myLatitude);
        var startLongRads = this.degreesToRadians(myLongitude);
        var destLatRads = this.degreesToRadians(latitude);
        var destLongRads = this.degreesToRadians(longitude);
        var Radius = 6371; // radius of the Earth in km
        var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
                Math.cos(startLatRads) * Math.cos(destLatRads) *
                Math.cos(startLongRads - destLongRads)) * Radius;
        distance = this.fomatFloat(distance,2);
        return distance;
    },
    degreesToRadians: function (degrees) {
        var radians = (degrees * Math.PI) / 180;
        return radians;
    },
    fomatFloat: function (src,pos) { //保留小数，四舍五入
        return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
    },
    ishaveTxPw(token,callback) { //判断用户是否设置提现密码
        $.ajax({
            url: this.preUrl + "api/user/ishaveTxPw.do?token=" + token,
            dataType:'json',
            success:function(data) {
                callback(data.code);
            },
            error : function() {
                console.log("Web False")
            }
        });
    },
    imgLogo(jobClass) { //根据兼职类型获取图片
        switch (jobClass){
            case 0:
                return "/mapp/image/online_attention.png";
                break;
            case 1:
                return "/mapp/image/online_download.png";
                break;
            case 2:
                return "/mapp/image/online_register.png";
                break;
            case 3:
                return "/mapp/image/online_experience.png";
                break;
            case 4:
                return "/mapp/image/online_other.png";
                break;
            case "实习":
                return "/mapp/image/offline_practice.png";
                break;
            case "主持":
                return "/mapp/image/offline_host.png";
                break;
            case "临时工":
                return "/mapp/image/offline_casual.png";
                break;
            case "产品":
                return "/mapp/image/offline_product.png";
                break;
            case "促销":
                return "/mapp/image/offline_promotion.png";
                break;
            case "其他":
                return "/mapp/image/offline_other.png";
                break;
            case "助教":
                return "/mapp/image/offline_assistant.png";
                break;
            case "安保":
                return "/mapp/image/offline_security.png";
                break;
            case "客服":
                return "/mapp/image/offline_custom_service.png";
                break;
            case "家教":
                return "/mapp/image/offline_tutor.png";
                break;
            case "志愿者":
                return "/mapp/image/offline_volunteer.png";
                break;
            case "快递":
                return "/mapp/image/offline_express.png";
                break;
            case "扫码":
                return "/mapp/image/offline_scan_code.png";
                break;
            case "技术":
                return "/mapp/image/offline_technology.png";
                break;
            case "文员":
                return "/mapp/image/offline_clerk.png";
                break;
            case "服务员":
                return "/mapp/image/offline_waiter.png";
                break;
            case "校内":
                return "/mapp/image/offline_in_school.png";
                break;
            case "模特":
                return "/mapp/image/offline_model.png";
                break;
            case "派单":
                return "/mapp/image/offline_dispatch.png";
                break;
            case "演出":
                return "/mapp/image/offline_show.png";
                break;
            case "礼仪":
                return "/mapp/image/offline_ceremony.png";
                break;
            case "策划":
                return "/mapp/image/offline_plan.png";
                break;
            case "编辑":
                return "/mapp/image/offline_editor.png";
                break;
            case "翻译":
                return "/mapp/image/offline_translate.png";
                break;
            case "设计":
                return "/mapp/image/offline_design.png";
                break;
            case "运营":
                return "/mapp/image/offline_operate.png";
                break;
            case "送餐":
                return "/mapp/image/offline_room_service.png";
                break;
            case "销售":
                return "/mapp/image/offline_sale.png";
                break;

        }
    },
    timeToHours: function (time) { //秒转换成小时
        return time / 1000 / 60 / 60;
    },
    getCountDown: function (startTime,reviewTime,callback,overTimeCallback) {
        let nowTime = new Date();
        let endTime = new Date(startTime + reviewTime); //计算订单的过期时间
        let t = endTime.getTime() - nowTime.getTime();
        if(t < 0) {
            overTimeCallback();
            return false;
        }else{
            let hour=Math.floor(t/1000/60/60%24);
            let min=Math.floor(t/1000/60%60);
            let sec=Math.floor(t/1000%60);
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            let countDownTime = hour + ":" + min + ":" + sec;
            callback(countDownTime);
        }
    },
    splitContent: function (content) {
        if(content){
            let contentDescription = content.split('\r\n');
            return contentDescription;
        }
    },
    replaceParamVal: function (paramName,replaceWith) { //修改url
        var oUrl = window.location.href.toString();
        var re=eval('/('+ paramName+'=)([^&]*)/gi');
        var nUrl;
        if(oUrl.match(paramName)){
            nUrl = oUrl.replace(re,paramName+'='+replaceWith);
        }else{
            if(oUrl.indexOf('?_k') != -1){
                nUrl = oUrl.split('?_k')[0] + '?' + paramName + '=' + replaceWith + '&_k' + oUrl.split('?_k')[1];
            }else if(oUrl.indexOf('&_k') != -1){
                nUrl = oUrl.split('&_k')[0] + '&' + paramName + '=' + replaceWith + '&_k' + oUrl.split('&_k')[1];
            }else{
                if(oUrl.match('[\?]')){
                    nUrl = oUrl + '&' + paramName + '=' +replaceWith;
                }else{
                    nUrl = oUrl + '?' + paramName + '=' +replaceWith;
                }
            }
        }
        window.location = nUrl;
    }
}

module.exports = Utils;