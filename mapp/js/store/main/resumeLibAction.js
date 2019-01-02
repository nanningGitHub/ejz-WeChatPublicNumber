/**
 * Created by Administrator on 2016/9/20.
 */
var EventEmitter = require('events').EventEmitter;
import Utils from './utils'

class ResumeLibAction extends EventEmitter {

    constructor(props) {
        super(props)
        this.state = {
            token: window.localStorage.token ? window.localStorage.token : ""
        }
    }
    /*
    * 获取简历库价格列表
    * */
    getResumeList(callback) {
        let url =  Utils.preUrl + "api/resume/getPriceList.do?token="+ this.state.token;
        $.ajax({
            url:url,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("getResumeList Web False")
            }
        });
    }
    getList(cityId,pageNo,pageSize,mainJobType,subJobType,settlementType,sortType,latitude,longitude,searchkey,callback) {
        let url =  Utils.preUrl + "api/resume/getList.do?cityId=" + cityId + "&mainJobTypeId=" + mainJobType + "&subJobTypeId=" + subJobType + "&gender=" + settlementType + "&sortType=" + sortType + "&pageNo=" + pageNo + "&pageSize=" + pageSize + "&latitude=" + latitude + "&longitude=" + longitude + "&searchkey=" + searchkey + "&token="+ this.state.token;
        $.ajax({
            url:url,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap,data);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }
    /*
    * 根据学校检索学生简历
    * */
    getSearchSchoolList(pageNo,pageSize,searchKey,callback) {
        let url =  Utils.preUrl + "api/resume/searchBySchool.do?pageNo=" + pageNo + "&pageSize=" + pageSize + "&token="+ this.state.token + "&school=" + searchKey;
        $.ajax({
            url:url,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }
    getPayList(pageNo,pageSize,latitude,longitude,callback) {
        let url =  Utils.preUrl + "api/resume/getPayList.do?pageNo=" + pageNo + "&pageSize=" + pageSize + "&latitude=" + latitude + "&longitude=" + longitude +  "&token="+ this.state.token;
        $.ajax({
            url:url,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }
    /*
     * 获取简历库校园搜搜条件搜索：[北京,职位,性别,排序]
     * */
    getConditions(cityId,callback) {
        $.ajax({
            url: Utils.preUrl + "api/resume/getConditions.do?cityId=" + cityId,
            dataType:'json',
            success:function(data) {
                callback(data.dataMap);
            },
            error : function() {
                console.log("Web False")
            }
        });
    }
    getHotWord(callback) { //获取线下兼职搜索热词
        $.ajax({
            url: Utils.preUrl + "api/school/getHotSchool.do",
            dataType:'json',
            success:function(data) {
                callback(data.dataMap)
            },
            error : function() {
                console.log("Web False")
            }
        });
    }
    getSurplusResumeCnt(callback) { //获取线下兼职搜索热词
        $.ajax({
            url: Utils.preUrl + "api/resume/getSurplus.do?token="+ this.state.token,
            dataType:'json',
            success:function(data) {
                callback(data)
            },
            error : function() {
                console.log("Web False")
            }
        });
    }
    // ------------------------------------------------------------------------------------------------------------------
}

module.exports = new ResumeLibAction();