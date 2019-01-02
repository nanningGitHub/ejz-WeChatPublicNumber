/*
 * llf
 * 简历库列表页面Item
 *
 * */
import React from "react";
import {Link} from "react-router";
import Utils from "../../../store/main/utils.js";
import style from "./css/resumeItem.css";
import Wrap from "../common/wrap.jsx";

//导入组件样式

//导入子组件


export default class ResumeItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            endDate: "",
            createdDate: "",
        }
    }

    componentDidMount = () => {
        let createdDate = new Date(this.props.createdDate)
        let endDate = new Date(this.props.endDate)
        this.setState({
            createdDate: Utils.getLocalTime(createdDate),
            endDate: Utils.getLocalTime(endDate),
        })
    }

    render() {
        return (
            <Wrap marginTop=".16rem">
                <Link to={{ pathname: '/resumeInfo/:' + this.props.id,query:{ userId : this.props.id,resumeId:this.props.resumeId }}} className={style.item}>
                    <section className={style.jobLogo}>
                        {
                                <img style={{width:"1.2rem",height:"1.2rem",borderRadius:"50%"}} src={this.props.headerFile}/>
                        }
                    </section>
                    <section className={style.textArea}>
                        <section className={style.titleArea}>
                            <section className={style.mainTitle}>
                                <h3 className={style.title}>{this.props.realName}</h3>
                                <section>
                                    <span className={style.gender}>{this.props.gender} | </span>
                                </section>
                                <section className={style.age}>{this.props.age}岁</section>
                            </section>
                            <section className={style.area}>
                                <section className={style.image}><img src="/mapp/image/distance.png" width="50%" /></section>
                                <section>{this.props.area}</section>
                            </section>
                        </section>
                        <section className={style.descriptionArea}>
                            <section className={style.jobTypeArea}>
                                <p className={style.jobType}>
                                    <span>{this.props.school}</span>
                                    |
                                    <span>{this.props.profession}</span>
                                </p>
                            </section>
                            <section>
                                <img src="/mapp/image/icon_go.png" width="50%" />
                            </section>
                        </section>
                    </section>
                </Link>
                <section className={style.lianXiTa}>
                    <section className={style.lianXiTaLeftLine}>
                        <Link to={{ pathname: '/resumeInfo/:' + this.props.id,query:{ userId : this.props.id }}}>
                            联系TA
                         </Link>
                     </section>
                </section>
            </Wrap>
        )
    }
}