import React from "react";
import iScroll from "iscroll/build/iscroll-probe";
import style from "./css/iscroll.css";
import Wrap from "./wrap.jsx"; // 只有这个库支持onScroll,从而支持bounce阶段的事件捕捉

//导入组件样式

//导入子组件

export default class Iscroll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            pullDownStatus: 3,
            pullUpStatus: 0,
            scrollY: this.props.scrollY
        }
        this.itemsChanged = false;
        this.pullDownTips = {
            // 下拉状态
            0: '下拉发起刷新',
            1: '继续下拉刷新',
            2: '松手即可刷新',
            3: '正在刷新',
            4: '刷新成功',
        };
        this.pullUpTips = {
            // 上拉状态
            0: '上拉发起加载',
            1: '松手即可加载',
            2: '正在加载',
            3: '加载成功',
        };
        this.isTouching = false;
        this.itemsChanged = false;
        this.controllChanged = false;
        this.onScroll = this.onScroll.bind(this);
        this.onScrollEnd = this.onScrollEnd.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.options = {
            // 默认iscroll会拦截元素的默认事件处理函数，我们需要响应onClick，因此要配置
            preventDefault: false,
            // 禁止缩放
            zoom: false,
            // 支持鼠标事件，因为我开发是PC鼠标模拟的
            mouseWheel: false,
            // 滚动事件的探测灵敏度，1-3，越高越灵敏，兼容性越好，性能越差
            probeType: 3,
            // 拖拽超过上下界后出现弹射动画效果，用于实现下拉/上拉刷新
            bounce: true,
            // 展示滚动条
            scrollbars: false,
        };
    }

    componentWillMount = () => {
        console.log('111')
        $("body").bind("touchmove",function(event){
            event.preventDefault();
        });
    }

    componentWillUnmount = () => {
        console.log('222')
        $("body").unbind("touchmove");
    }

    componentDidMount() {
        let self = this;
        this.iScrollInstance = new iScroll(`#${style.ListOutsite}`, this.options);
        this.iScrollInstance.on('scroll', this.onScroll);
        this.iScrollInstance.on('scrollEnd', this.onScrollEnd);
        this.props.fetchItems(true,this.state.pullDownStatus,this.state.pullUpStatus,function () {
            self.setState({
                pullDownStatus: 4,
            });
            self.iScrollInstance.scrollTo(0,parseInt(self.state.scrollY));
        });
    }

    onTouchStart(ev) {
        this.isTouching = true;
    }

    onTouchEnd(ev) {
        this.isTouching = false;
    }

    onPullDown() {
        // 手势
        if (this.isTouching) {
            if (this.iScrollInstance.y > 5) {
                this.state.pullDownStatus != 2 && this.setState({pullDownStatus: 2});
            } else {
                this.state.pullDownStatus != 1 && this.setState({pullDownStatus: 1});
            }
        }
    }

    onPullUp() {
        // 手势
        if (this.isTouching) {
            if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY - 45) {
                this.state.pullUpStatus != 1 && this.setState({pullUpStatus: 1});
            } else {
                this.state.pullUpStatus != 0 && this.setState({pullUpStatus: 0});
            }
        }
    }

    onScroll() {
        let pullDown = $(this.refs.PullDown);
        // 上拉区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            this.onPullDown();
        } else {
            this.state.pullDownStatus != 0 && this.setState({pullDownStatus: 0});
        }

        // 下拉区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY + 5) {
            this.onPullUp();
        }
    }

    onScrollEnd() {
        let self = this;
        let pullDown = $(this.refs.PullDown);
        this.props.getY(this.iScrollInstance.y);
        // 滑动结束后，停在刷新区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            if (this.state.pullDownStatus <= 1) {   // 没有发起刷新,那么弹回去
                this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 200);
            } else if (this.state.pullDownStatus == 2) { // 发起了刷新,那么更新状态
                this.setState({
                    pullDownStatus: 3
                },function () {
                    this.props.fetchItems(true,this.state.pullDownStatus,this.state.pullUpStatus,function () {
                        self.setState({
                            pullDownStatus: 4,
                        });
                        self.iScrollInstance.scrollTo(0, -1 * $(self.refs.PullDown).height(),500);
                    });
                });
            }
        }

        // 滑动结束后，停在加载区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY) {
            if (this.state.pullUpStatus == 1) { // 发起了加载，那么更新状态
                this.setState({
                    pullUpStatus: 2
                },function () {
                    this.props.fetchItems(false,this.state.pullDownStatus,this.state.pullUpStatus,function () {
                        self.setState({
                            pullUpStatus: 0,
                        });
                    });
                });
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 列表发生了变化, 那么应该在componentDidUpdate时调用iscroll进行refresh
        this.itemsChanged = nextProps.dataList !== this.props.dataList;
        this.controllChanged = nextProps.scrollControll !== this.props.scrollControll;
        return true;
    }

    componentDidUpdate() {
        // 仅当列表发生了变更，才调用iscroll的refresh重新计算滚动条信息
        if (this.itemsChanged) {
            this.iScrollInstance.refresh();
        }
        if (!this.props.scrollControll) {
            this.iScrollInstance.destroy();
        }else if (this.controllChanged && this.props.scrollControll) {
            this.iScrollInstance = new iScroll(`#${style.ListOutsite}`, this.options);
            this.iScrollInstance.on('scroll', this.onScroll);
            this.iScrollInstance.on('scrollEnd', this.onScrollEnd);
            this.setState({
                pullDownStatus: 4,
            });
            this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height());
        }
        return true;
    }

    render() {
        return (
            <div className="wrap" style={{height:'100%',overflow:'scroll'}}>
                <div id={style.ScrollContainer}>
                    <div id={style.ListOutsite} style={{height: window.innerHeight}} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
                        <section id={style.ListInside}>
                            <p ref="PullDown" id={style.PullDown}>{this.pullDownTips[this.state.pullDownStatus]}</p>
                            {this.props.children}
                            <Wrap marginTop="0.16rem">
                                {this.props.dataList}
                            </Wrap>
                            {
                                this.props.totalPage <= 1 ? (
                                    ""
                                ) : (
                                    <p ref="PullUp" id={style.PullUp}>{this.pullUpTips[this.state.pullUpStatus]}</p>
                                )
                            }
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}