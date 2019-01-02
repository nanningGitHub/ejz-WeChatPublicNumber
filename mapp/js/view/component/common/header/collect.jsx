import React from 'react';
import CollectAction from '../../../../store/main/collectAction';

export default class Collect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            favoriteJobId: '',
            status: -1,
        }
    }

    componentWillMount = () => {
        let self = this;
        CollectAction.getFavoriteJobId(this.props.jobOfflineId, function (data) {
            if(data.dataMap.status == 1){
                self.setState({
                    favoriteJobId: data.dataMap.favoriteJobId,
                    status: data.dataMap.status
                })
            }
        })
    }

    collectHandle = (data) => {
        this.setState({
            favoriteJobId: data.dataMap.favoriteJobId,
            status: data.dataMap.status
        })
    }

    cancelCollectHandle = () => {
        this.setState({
            status: -1
        })
    }

    render() {
        return (
            <section className="e-header-collect">
                {
                    this.state.status == 1 ? (
                            <IsCollect favoriteJobId={this.state.favoriteJobId}
                                       cancelCollectHandle={this.cancelCollectHandle}
                            />
                        ) : (
                            <NotCollect jobOfflineId={this.props.jobOfflineId}
                                        collectHandle={this.collectHandle}
                            />
                        )
                }
            </section>
        )
    }
}

class IsCollect extends React.Component {
    constructor(props) {
        super(props);
        this.collectStatus = true;
    }

    delFavoriteJob = (favoriteId) => {
        if(this.collectStatus) {
            this.collectStatus = false;
            let self = this;
            CollectAction.delFavoriteJob(favoriteId, function (data) {
                if (data.code == 0) {
                    self.props.cancelCollectHandle()
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

    render(){
        return(
            <a onClick={() => {this.delFavoriteJob(this.props.favoriteJobId)}}>
                <img src="./mapp/image/collect_do.png" />
            </a>
        )
    }
}

class NotCollect extends React.Component {
    constructor(props) {
        super(props);
        this.collectStatus = true;
    }

    addFavoriteJob = (jobOfflineId) => {
        if(this.collectStatus){
            this.collectStatus = false;
            let self = this;
            CollectAction.addFavoriteJob(jobOfflineId,function (data) {
                if(data.code == 0 ){
                    CollectAction.getFavoriteJobId(jobOfflineId, function (data) {
                        self.collectStatus = false;
                        layer.open({
                            content: "收藏成功",
                            skin: 'msg',
                            style: 'color:#ffffff;bottom:0;',
                            time: 3
                        });
                        self.props.collectHandle(data);
                    })
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

    render(){
        return(
            <a onClick={() => {this.addFavoriteJob(this.props.jobOfflineId)}}>
                <img src="./mapp/image/collect_no.png" />
            </a>
        )
    }
}