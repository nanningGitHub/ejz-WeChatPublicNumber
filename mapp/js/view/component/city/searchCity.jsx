import React from "react";
import {hashHistory} from "react-router";
import CityAction from "../../../store/main/cityAction.js";
import style from "./css/city.css";

import Header from '../common/header/header.jsx';
import HistoryBack from '../common/header/historyBack.jsx';
import Wrap from '../common/wrap.jsx';
import NoData from '../common/noData.jsx';

export default class SearchCity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            historyBack: {
                width: 'auto',
                order: '1'
            },
            searchKey: "",
            searchList: [],
        }
    }

    changeHandle = (e) => {
        let self = this;
        this.setState({
            searchKey: e.target.value
        })
    }

    searchHandle = () => {
        if(window.event.keyCode == 13){
            if(this.state.searchKey.replace(/(^s*)|(s*$)/g, "").length != 0) {
                this.getCitysForGPS(this.state.searchKey);
            }else{
                return false;
            }
        }
    }

    getCitysForGPS = (keyname) => {
        let self = this;
        CityAction.getCitysForGPS(keyname, function (data) {
            self.setState({
                searchList: data.cityList
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
                <Header flex="flex-start" template="search">
                    <HistoryBack style={this.state.historyBack}/>
                    <section className="e-header-search-bar flex flex-row flex-start align-center">
                        <span></span>
                        <input type="text" placeholder="输入城市关键字" value={this.state.searchKey} className="flex1" onChange={this.changeHandle.bind(this)} onKeyDown={() => {this.searchHandle()}}/>
                    </section>
                </Header>
                <section className="wrapWithHeader">
                    {
                        this.state.searchList && this.state.searchList.length ? (
                            <Wrap marginTop=".16rem">
                                {
                                    this.state.searchList.map((list,i) => {
                                        return(
                                            <section className={style.sortCity} key={i} onClick={() => {this.chooseCity(list.key,list.value)}}>
                                                <p>{list.value}</p>
                                            </section>
                                        )
                                    })
                                }
                            </Wrap>
                        ) : (
                            <NoData/>
                        )
                    }
                </section>
            </section>
        )
    }
}