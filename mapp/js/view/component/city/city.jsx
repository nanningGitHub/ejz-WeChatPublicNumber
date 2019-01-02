import React from "react";
import {Link, hashHistory} from "react-router";
import Utils from "../../../store/main/utils.js";
import CityAction from "../../../store/main/cityAction.js";
import style from "./css/city.css";

import Header from '../common/header/header.jsx';
import HistoryBack from '../common/header/historyBack.jsx';
import Wrap from '../common/wrap.jsx';

export default class City extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSearch: false,
            hotCity: [],
            nowCityId: "",
            nowCityName: "定位中...",
            lastCityList: []
        }
    }
    
    componentWillMount = () => {
        let self = this;
        Utils.selectCity(function (nowCityId,nowCityName) {
           self.setState({
               nowCityId: nowCityId,
               nowCityName: nowCityName
           })
        });
        this.getHotCity();
        this.getCitysForGPS('');
    }

    getHotCity = () => {
        let self = this;
        CityAction.getHotCity(function (data) {
            self.setState({
                hotCity: data.cityList
            })
        })
    }

    getCitysForGPS = (keyname) => {
        let self = this;
        CityAction.getCitysForGPS(keyname,function (data) {
            let AObjectList = [];
            let BObjectList = [];
            let CObjectList = [];
            let DObjectList = [];
            let EObjectList = [];
            let FObjectList = [];
            let GObjectList = [];
            let HObjectList = [];
            let IObjectList = [];
            let JObjectList = [];
            let KObjectList = [];
            let LObjectList = [];
            let MObjectList = [];
            let NObjectList = [];
            let OObjectList = [];
            let PObjectList = [];
            let QObjectList = [];
            let RObjectList = [];
            let SObjectList = [];
            let TObjectList = [];
            let UObjectList = [];
            let VObjectList = [];
            let WObjectList = [];
            let XObjectList = [];
            let YObjectList = [];
            let ZObjectList = [];
            let AObject = {
                "cityFlagName":"A",
                "cityFlagNameList":AObjectList
            };
            let BObject = {
                "cityFlagName":"B",
                "cityFlagNameList":BObjectList
            };
            let CObject = {
                "cityFlagName":"C",
                "cityFlagNameList":CObjectList
            };
            let DObject = {
                "cityFlagName":"D",
                "cityFlagNameList":DObjectList
            };
            let EObject = {
                "cityFlagName":"E",
                "cityFlagNameList":EObjectList
            };
            let FObject = {
                "cityFlagName":"F",
                "cityFlagNameList":FObjectList
            };
            let GObject = {
                "cityFlagName":"G",
                "cityFlagNameList":GObjectList
            };
            let HObject = {
                "cityFlagName":"H",
                "cityFlagNameList":HObjectList
            };
            let IObject = {
                "cityFlagName":"I",
                "cityFlagNameList":IObjectList
            };
            let JObject = {
                "cityFlagName":"J",
                "cityFlagNameList":JObjectList
            };
            let KObject = {
                "cityFlagName":"K",
                "cityFlagNameList":KObjectList
            };
            let LObject = {
                "cityFlagName":"L",
                "cityFlagNameList":LObjectList
            };
            let MObject = {
                "cityFlagName":"M",
                "cityFlagNameList":MObjectList
            };
            let NObject = {
                "cityFlagName":"N",
                "cityFlagNameList":NObjectList
            };
            let OObject = {
                "cityFlagName":"O",
                "cityFlagNameList":OObjectList
            };
            let PObject = {
                "cityFlagName":"P",
                "cityFlagNameList":PObjectList
            };
            let QObject = {
                "cityFlagName":"Q",
                "cityFlagNameList":QObjectList
            };
            let RObject = {
                "cityFlagName":"R",
                "cityFlagNameList":RObjectList
            };
            let SObject = {
                "cityFlagName":"S",
                "cityFlagNameList":SObjectList
            };
            let TObject = {
                "cityFlagName":"T",
                "cityFlagNameList":TObjectList
            };
            let UObject = {
                "cityFlagName":"U",
                "cityFlagNameList":UObjectList
            };
            let VObject = {
                "cityFlagName":"V",
                "cityFlagNameList":VObjectList
            };
            let WObject = {
                "cityFlagName":"W",
                "cityFlagNameList":WObjectList
            };
            let XObject = {
                "cityFlagName":"X",
                "cityFlagNameList":XObjectList
            };
            let YObject = {
                "cityFlagName":"Y",
                "cityFlagNameList":YObjectList
            };
            let ZObject = {
                "cityFlagName":"Z",
                "cityFlagNameList":ZObjectList
            };
            for(let k = 0; k < data.cityList.length; k++) {
                switch (data.cityList[k].enValue.substr(0, 1)) {
                    case 'a':
                    case 'A':
                        AObjectList.push(data.cityList[k]);
                        break;
                    case 'b':
                    case 'B':
                        BObjectList.push(data.cityList[k]);
                        break;
                    case 'c':
                    case 'C':
                        CObjectList.push(data.cityList[k]);
                        break;
                    case 'd':
                    case 'D':
                        DObjectList.push(data.cityList[k]);
                        break;
                    case 'e':
                    case 'E':
                        EObjectList.push(data.cityList[k]);
                        break;
                    case 'f':
                    case 'F':
                        FObjectList.push(data.cityList[k]);
                        break;
                    case 'g':
                    case 'G':
                        GObjectList.push(data.cityList[k]);
                        break;
                    case 'h':
                    case 'H':
                        HObjectList.push(data.cityList[k]);
                        break;
                    case 'i':
                    case 'I':
                        IObjectList.push(data.cityList[k]);
                        break;
                    case 'j':
                    case 'J':
                        JObjectList.push(data.cityList[k]);
                        break;
                    case 'k':
                    case 'K':
                        KObjectList.push(data.cityList[k]);
                        break;
                    case 'l':
                    case 'L':
                        LObjectList.push(data.cityList[k]);
                        break;
                    case 'm':
                    case 'M':
                        MObjectList.push(data.cityList[k]);
                        break;
                    case 'n':
                    case 'N':
                        NObjectList.push(data.cityList[k]);
                        break;
                    case 'o':
                    case 'O':
                        OObjectList.push(data.cityList[k]);
                        break;
                    case 'p':
                    case 'P':
                        PObjectList.push(data.cityList[k]);
                        break;
                    case 'q':
                    case 'Q':
                        QObjectList.push(data.cityList[k]);
                        break;
                    case 'r':
                    case 'R':
                        RObjectList.push(data.cityList[k]);
                        break;
                    case 's':
                    case 'S':
                        SObjectList.push(data.cityList[k]);
                        break;
                    case 't':
                    case 'T':
                        TObjectList.push(data.cityList[k]);
                        break;
                    case 'u':
                    case 'U':
                        UObjectList.push(data.cityList[k]);
                        break;
                    case 'v':
                    case 'V':
                        VObjectList.push(data.cityList[k]);
                        break;
                    case 'w':
                    case 'W':
                        WObjectList.push(data.cityList[k]);
                        break;
                    case 'x':
                    case 'X':
                        XObjectList.push(data.cityList[k]);
                        break;
                    case 'y':
                    case 'Y':
                        YObjectList.push(data.cityList[k]);
                        break;
                    case 'z':
                    case 'Z':
                        ZObjectList.push(data.cityList[k]);
                        break;
                }
            }
            let lastCityList = [AObject,BObject,CObject,DObject,EObject,FObject,GObject,HObject,IObject,JObject,KObject,LObject,MObject,NObject,OObject,PObject,QObject,RObject,SObject,TObject,UObject,VObject,WObject,XObject,YObject,ZObject];
            self.setState({
                lastCityList: lastCityList
            })
        })
    }

    chooseCity = (cityId,cityName) => {
        if(cityId && cityName){
            window.sessionStorage.setItem('cityId',cityId);
            window.sessionStorage.setItem('cityName',cityName);
        }
        hashHistory.push('/');
    }

    render() {
        return (
            <section>
                <Header title="选择城市">
                    <HistoryBack order="1"/>
                </Header>
                <Link to="/searchCity" className={style.searchCity}>
                    <Wrap marginTop=".16rem">
                        <input type="text" className={style.inputFile} placeholder="输入关键字查找城市" disabled="disabled"/>
                    </Wrap>
                </Link>
                <section className={style.wrapWithHeader}>
                    <section className={style.cityMainArea}>
                        <section className={style.nowCityArea}>
                            <p className={style.nowCityTitle}>当前定位：</p>
                            <p className={style.nowCity} onClick={() => {this.chooseCity(this.state.nowCityId,this.state.nowCityName)}}>{this.state.nowCityName}</p>
                        </section>
                        <section className={style.hotCityArea}>
                            <section className={style.hotCityTitle}>
                                <p>热门城市</p>
                            </section>
                            <section className={style.hotCityList}>
                                {
                                    this.state.hotCity.map((hotCitys,i) => {
                                        return(
                                            <a key={i} onClick={() => {this.chooseCity(hotCitys.key,hotCitys.value)}}>{hotCitys.value}</a>
                                        )
                                    })
                                }
                            </section>
                        </section>
                        {
                            this.state.lastCityList.map((list,i) => {
                                return(
                                    this.state.lastCityList[i].cityFlagNameList.length ? (
                                        <section className={style.sortArea} key={i}>
                                            <section className={style.sortLetter}>
                                                <p id={list.cityFlagName}>{list.cityFlagName}</p>
                                            </section>
                                            {
                                                this.state.lastCityList[i].cityFlagNameList.map((cityList,k) => {
                                                    return(
                                                        <section className={style.sortCity} key={k} onClick={() => {this.chooseCity(cityList.key,cityList.value)}}>
                                                            <p>{cityList.value}</p>
                                                        </section>
                                                    )
                                                })
                                            }
                                        </section>
                                    ) : ("")
                                )
                            })
                        }
                    </section>
                </section>
            </section>
        )
    }
}