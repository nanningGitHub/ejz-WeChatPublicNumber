import Utils from './utils'

let IndexAction = {
    showHome: function(cityId,callback) {
        $.ajax({
            url: Utils.preUrl + "showHome.do",
            type: 'get',
            dataType:'json',
            data: {
                cityId: cityId
            },
            success:function(data) {
                callback(data);
            },
            error : function() {
                // alert("请检查您的网络状况！");
            }
        });
    }
}

module.exports = IndexAction;