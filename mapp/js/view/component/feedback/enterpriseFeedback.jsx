import React from "react";
import FeedbackAction from "../../../store/main/feedbackAction.js";
import style from "./css/feedback.css";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'

export default class EnterpriseFeedback extends React.Component{
    constructor(props){
        super(props)
        this.content = "";
    }

    feedback = () => {
        let enterpriseId = this.props.location.query.enterpriseId;
        let content = this.content;
        let comment = this.refs.comment.value;
        FeedbackAction.touSuQiYe(enterpriseId,content,comment);
    }

    handleChange = (e) => {
        let str = document.getElementsByName('feedbackItmes')
        if(e.target.checked){
            this.refs[e.target.id].style.background = '#37d3cb'
            this.refs[e.target.id].style.color = '#ffffff'
        }else{
            this.refs[e.target.id].style.background = '#dbedff'
            this.refs[e.target.id].style.color = '#333333'
        }
        let contentArray = [];
        for(let i=0;i<str.length;i++){
            if(str[i].checked){
                contentArray = contentArray.concat([str[i].value]);
            }
        }
        this.content = contentArray.toString();
    }

    render(){
        return(
            <section>
                <Header title="投诉">
                    <HistoryBack/>
                </Header>
                <section className="wrapWithHeader">
                    <h3 className={style.enterpriseFeedbackTitle}>投诉内容</h3>
                    <ul className={style.enterpriseFeedbackContentList}>
                        <li>
                            <label htmlFor="item1" ref="item1">
                                <input type="checkbox" id="item1" value="工资拖欠" name="feedbackItmes" onChange={this.handleChange.bind(this)}/>
                                工资拖欠
                            </label>
                        </li>
                        <li>
                            <label htmlFor="item2" ref="item2">
                                <input type="checkbox" id="item2" value="收取费用" name="feedbackItmes" onChange={this.handleChange.bind(this)}/>
                                收取费用
                            </label>
                        </li>
                        <li>
                            <label htmlFor="item3" ref="item3">
                                <input type="checkbox" id="item3" value="工作内容与描述不符" name="feedbackItmes" onChange={this.handleChange.bind(this)}/>
                                工作内容与描述不符
                            </label>
                        </li>
                    </ul>
                    <h3 className={style.enterpriseFeedbackTitle}>补充说明（限200字以内）</h3>
                    <textarea placeholder="请输入想要投诉的内容" ref="comment" className={style.enterpriseFeedbackComment}></textarea>
                    <section className="submitButton">
                        <a onClick={() => {this.feedback()}}>提交</a>
                    </section>
                </section>
            </section>
        )
    }
}