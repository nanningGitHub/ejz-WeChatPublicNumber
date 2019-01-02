import React from "react";
import FeedbackAction from "../../../store/main/feedbackAction.js";
import style from "./css/feedback.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import HeaderContent from '../common/header/headerContent.jsx'
import Wrap from '../common/wrap.jsx'

export default class JobFeedback extends React.Component{
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
                <Header title="我要投诉">
                    <HistoryBack/>
                    <HeaderContent title="提交" onHandle={this.feedback}/>
                </Header>
                <section className="wrapWithHeader">
                    <Wrap marginTop=".16rem">
                        <section className={style.jobFeedbackArea}>
                            <section className={style.jobFeedback}>
                                <textarea placeholder="请写明投诉的原因，比如虚假信息、黑中介、收取费用等（1-200字之间）" ref="content"></textarea>
                            </section>
                        </section>
                    </Wrap>
                </section>
            </section>
        )
    }
}