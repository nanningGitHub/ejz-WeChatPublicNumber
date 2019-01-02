import Utils from './utils.js'

var JsonData = {
    degree: [
        {'id':0,'value':'小学'},
        {'id':1,'value':'初中'},
        {'id':2,'value':'高中'},
        {'id':3,'value':'专科'},
        {'id':4,'value':'本科'},
        {'id':5,'value':'硕士'},
        {'id':6,'value':'博士'}
    ],
    studyDate: function () {
        var dateArray = [];
        for(var i=0;i<50;i++){
            var date = {
                'id': i,
                'value': 1970+i
            };
            dateArray.push(date);
        }
        return dateArray;
    },
    getProvince: function (callback) {
        $.ajax({
            url: Utils.preUrl + "api/city/getProvince.do",
            dataType:'json',
            success:function(data) {
                callback(data.dataMap)
            },
            error : function() {
                console.log("Web False")
            }
        });
    },
    getChildrenCity: function (parentId,callback) {
        $.ajax({
            url: Utils.preUrl + "api/city/getChildrenCity.do?parentId=" + parentId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap)
            },
            error : function() {
                console.log("Web False")
            }
        });
    },
    getArea: function (parentId,callback) {
        $.ajax({
            url: Utils.preUrl + "api/city/getArea.do?parentId=" + parentId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap)
            },
            error : function() {
                console.log("Web False")
            }
        });
    },
}

module.exports = JsonData;/**
 * Created by Administrator on 2016/10/25.
 */
