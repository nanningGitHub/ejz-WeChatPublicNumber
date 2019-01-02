import React from "react";
import Utils from "../../../store/main/utils.js";
import style from "./css/jobList.css";

//导入组件样式

export default class JobList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imgUrl: "",
            startDate: "",
            endDate: ""
        }
    }

    render() {
        return (
            <section className={style.item + " flex flex-row flex-start"} style={this.props.index =="jobInfo" ? {padding:'0 .3rem'} : {}}>
                <section className={style.imgArea}>
                    {
                        this.props.index == "index" ? (
                            <img style={{width:'1.5rem',height:'1.2rem'}} src={this.props.imgUrl}/>
                        ) : (
                            this.props.indexJobInfo ? (
                                <img style={{width:'1.1rem',height:'1.1rem'}} src={this.props.imgUrl}/>
                            ) : (
                                <img style={{width:'1.1rem',height:'1.1rem'}} src={Utils.imgLogo(this.props.jobClass)}/>
                            )
                        )
                    }
                </section>
                <section className={style.textArea}>
                    <section className={style.firstRow + " flex flex-row flex-between align-center"}>
                        <section className={style.firstRowLeft + " flex flex-row flex-start align-center"}>
                            <h3 style={this.props.isDelete == 0 ? {color:'#bbbbbb'} : {}}>{this.props.title}</h3>
                            <p style={this.props.isDelete == 0 ? {color:'#bbbbbb'} : {}}>{this.props.jobStatus}</p>
                        </section>
                        <section className={style.firstRowRight}>
                            {
                                this.props.jobDetalStatus ? (
                                    this.props.jobDetalStatus != "已取消" ? (
                                        <p style={this.props.isDelete == 0 ? {color:'#bbbbbb'} : {}}>{this.props.jobDetalStatus}</p>
                                    ) : (
                                        <p className={style.isCancel}>{this.props.jobDetalStatus}</p>
                                    )
                                ) : ("")
                            }
                            {
                                this.props.isSpecial ? (
                                    <p className={style.specialPrice} style={this.props.isDelete == 0 ? {color:'#bbbbbb'} : {}}>{this.props.specialPrice}</p>
                                ) : ("")
                            }
                        </section>
                    </section>
                    <section className={style.secondRow + " flex flex-row flex-between align-center"}>
                        <section className={style.secondRowLeft  + " flex flex-row flex-start align-center"}>
                            {
                                this.props.jobTypeStr ? (
                                    <p className={style.jobType}>{this.props.jobTypeStr}</p>
                                ) : ("")
                            }
                            {
                                this.props.settlementTypeStr ? (
                                    <p className={style.settlementType}>{this.props.settlementTypeStr + "结"}</p>
                                ) : ("")
                            }
                            {
                                this.props.suplusCount ? (
                                    <p className={style.suplusCount} style={this.props.isDelete == 0 ? {color:'#bbbbbb'} : {}}>剩余：<span style={this.props.isDelete == 0 ? {color:'#bbbbbb'} : {}}>{this.props.suplusCount}次</span></p>
                                ) : ("")
                            }
                        </section>
                        <section className={style.secondRowRight  + " flex flex-row flex-start align-center"}>
                            {
                                this.props.salaryUnitStr ? (
                                    this.props.salaryUnitStr == "面议" ? (
                                        <p className={style.price} style={this.props.isDelete == 0 ? {color:'#bbbbbb'} : {}}>{this.props.salaryUnitStr}</p>
                                    ) : (
                                        this.props.index == "jobInfo" ? (
                                            <p className={style.price}>{this.props.price}</p>
                                        ) : (
                                            <section className={style.priceArea  + " flex flex-row flex-start align-center"}>
                                                <p className={style.price}>{this.props.price}</p>
                                                <p className={style.priceInfo}>RMB/{this.props.salaryUnitStr}</p>
                                            </section>
                                        )
                                    )
                                ) : (
                                    <p className={style.price} style={this.props.isDelete == 0 ? {color:'#bbbbbb'} : {}}>{this.props.price}</p>
                                )
                            }
                        </section>
                    </section>
                    <section className={style.thirdRow + " flex flex-row flex-between align-center"}>
                        <section className={style.thirdRowLeft}>
                            {
                                this.props.startDate && this.props.endDate ? (
                                    <p>{Utils.getLocalTime(new Date(this.props.startDate)) + "至" + Utils.getLocalTime(new Date(this.props.endDate))}</p>
                                ) : (
                                    this.props.endDate ? (
                                        <p style={this.props.isDelete == 0 ? {color:'#bbbbbb'} : {}}>{"截止：" + Utils.getLocalTime(new Date(this.props.endDate))}</p>
                                    ) : (
                                        this.props.index == "jobInfo" ? (
                                            <p>{Utils.getLocalTime(new Date(this.props.modifyDate))}</p>
                                        ) : ("")
                                    )
                                )
                            }
                        </section>
                        <section className={style.thirdRowRight  + " flex flex-row flex-start align-center"}>
                            {
                                this.props.latitude && this.props.longitude ? (
                                    ''
                                ) : (
                                    this.props.index == "jobInfo" ? (
                                        this.props.salaryUnitStr == "面议" ? (
                                            ""
                                        ) : (
                                            <p>{"RMB/" + this.props.salaryUnitStr}</p>
                                        )
                                    ) : (
                                        <p style={this.props.isDelete == 0 ? {color:'#bbbbbb'} : {}}>RMB</p>
                                    )
                                )
                            }
                        </section>
                    </section>
                </section>
            </section>
        )
    }
}