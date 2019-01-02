import React from "react";
import style from "./css/myTask.css";

import Header from '../common/header/header.jsx';
import HistoryBack from '../common/header/historyBack.jsx';
import MyTaskList from './myTaskList.jsx';

export default class MyTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
        }
        this.swiper = "";
    }

    componentDidMount = () => {
        let self = this;
        this.refs["item"+this.state.index].style.borderBottom = '.04rem solid #37d3cb';
        this.refs["item"+this.state.index].style.color = '#37d3cb';
        var swiper = new Swiper('.swiper-container', {
            resistanceRatio: 0,
            onSlideChangeEnd: function(swiper) {
                for(let i=0; i<4; i++){
                    self.refs["item"+i].style.borderBottom = 'none';
                    self.refs["item"+i].style.color = '#bbbbbb';
                }
                self.refs["item"+swiper.activeIndex].style.borderBottom = '.04rem solid #37d3cb';
                self.refs["item"+swiper.activeIndex].style.color = '#37d3cb';
            }
        });
        this.swiper = swiper;
    }

    slideController = (index) => {
        this.swiper.slideTo(index, 300, true);
    }

    render() {
        return (
            <section>
                <Header title="我的任务" flex="flex-start">
                    <HistoryBack order="1"/>
                </Header>
                <section className={style.nav}>
                    <a className={style.navItem} ref="item0" onClick={() => {this.slideController(0)}}>
                        全部
                    </a>
                    <a className={style.navItem} ref="item1" onClick={() => {this.slideController(1)}}>
                        进行中
                    </a>
                    <a className={style.navItem} ref="item2" onClick={() => {this.slideController(2)}}>
                        审核中
                    </a>
                    <a className={style.navItem} ref="item3" onClick={() => {this.slideController(3)}}>
                        已结束
                    </a>
                </section>
                <div className="swiper-container" style={{width: "100%",height: "100%"}}>
                    <div className="swiper-wrapper">
                        <MyTaskList orderStatus="-1"/>
                        <MyTaskList orderStatus="0"/>
                        <MyTaskList orderStatus="1"/>
                        <MyTaskList orderStatus="2"/>
                    </div>
                </div>
            </section>
        )
    }
}