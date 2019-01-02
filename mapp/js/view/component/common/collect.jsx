import React from "react";
import CollectAction from "../../../store/main/collectAction.js";
import style from "./css/icon.css";

//导入组件样式

//导入子组件


export default class Collect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userFavoriteId: '',
            status: -1,
        }
        this.collectStatus = true
    }

    componentWillMount = () => {
        this.getFavoriteJobId(this.props.jobOfflineId);
    }

    getFavoriteJobId = (articleId) => { //判断用户是否收藏该职位并获取职位收藏id
        let self = this;
        CollectAction.getFavoriteJobId(articleId, function (data) {
            self.collectStatus = true;
            self.setState({
                userFavoriteId: data.favoriteJobId,
                status: data.status
            })
        })
    }

    circleGetFavoriteJobId = (jobOfflineId) => {
        let self = this;
        setTimeout(function () {
            CollectAction.getFavoriteJobId(jobOfflineId, function (data) {
                if(data.status == -1){
                    self.circleGetFavoriteJobId(jobOfflineId);
                }else{
                    self.collectStatus = true;
                    self.setState({
                        userFavoriteId: data.favoriteJobId,
                        status: data.status
                    })
                    layer.open({
                        content: "收藏成功",
                        skin: 'msg',
                        style: 'color:#ffffff;bottom:0;',
                        time: 3
                    });
                }
            })
        },300)
    }

    addFavoriteJob = (jobOfflineId) => {
        if(this.collectStatus){
            this.collectStatus = false;
            let self = this;
            CollectAction.addFavoriteJob(jobOfflineId,function (data) {
                if(data.code == 0 ){
                    self.circleGetFavoriteJobId(jobOfflineId)
                }else{
                    layer.open({
                        content: data.msg,
                        skin: 'msg',
                        style: 'color:#ffffff;bottom:0;',
                        time: 3
                    });
                    self.collectStatus = true;
                }
            })
        }else{
            return false;
        }
    }

    delFavoriteJob = (favoriteId) => {
        if(this.collectStatus) {
            this.collectStatus = false;
            let self = this;
            CollectAction.delFavoriteJob(favoriteId, function (data) {
                if (data.code == 0) {
                    self.setState({
                        status: -1,
                    })
                }
                layer.open({
                    content: data.msg,
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
                self.collectStatus = true;
            })
        }else{
            return false;
        }
    }

    render() {
        return (
            <section className={style.headerRight} style={{order: this.props.order}}>
                {
                    this.state.status == 1 ? (
                        <a onClick={() => {this.delFavoriteJob(this.state.userFavoriteId)}}>
                            <img style={{width:'.42rem',height:'.42rem'}} src="/mapp/image/collect_do.png"/>
                        </a>
                    ) : (
                        <a onClick={() => {this.addFavoriteJob(this.props.jobOfflineId)}}>
                            <img style={{width:'.42rem',height:'.42rem'}} src="/mapp/image/collect_no.png"/>
                        </a>
                    )
                }
            </section>
        )
    }
}