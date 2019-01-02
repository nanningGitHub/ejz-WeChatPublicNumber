import React from "react";
import FeedbackAction from "../../../store/main/feedbackAction.js";
import style from "./css/feedback.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import HeaderContent from '../common/header/headerContent.jsx'
import Wrap from '../common/wrap.jsx'

export default class ResumeFeedback extends React.Component{
    constructor(props){
        super(props)
    }

    feedback = () => {
        let jobOfflineId = this.props.location.query.jobOfflineId;
        let content = this.refs.content.value;
        FeedbackAction.touSuJob(jobOfflineId,content);
    }

    render(){
        return(
            <section>
                <Header title="投诉">
                    <HistoryBack/>
                    <HeaderContent title="提交" onHandle={this.feedback}/>
                </Header>
                <section className="wrapWithHeader">
                    <Wrap marginTop=".16rem">
                        <p className={style.rf_row}>投诉内容</p>
                        <section className={style.rf_row}>
                            <span>性别虚假</span>
                            <span>学历不符</span>
                        </section>
                    </Wrap>
                    <Wrap marginTop=".16rem">
                        <p className={style.rf_row}>补充说明(限200字以内)</p>
                        <section className={style.jobFeedbackArea}>
                            <section className={style.jobFeedback}>
                                <textarea placeholder="请输入想要投诉的内容" ref="content"></textarea>
                            </section>
                        </section>
                    </Wrap>
                </section>
            </section>
        )
    }
}