import React from "react";
import style from "./css/sort.css";

//导入组件样式

export default class Sort extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sortDataList: [],
            status: false,
            linkNum: 0
        }
    }

    checkSort = (value,key) => {
        this.props.checkSort(value,key);
    }

    checkJobType = (value, key, num) => { //级联下拉选择框父级
        if(num.i == 0) {
            // todo
        }
        this.setState({
            linkNum: num.i
        })
    }

    submitJobType = (value, key) => {
        this.props.submitJobType(value,key,this.state.linkNum)
    }

    render() {
        return (
            <section className={style.wrap}>
                {this.props.children}
                {
                    this.props.status ? (
                        this.props.sortDataListTwoColumns ? (
                            <section className={style.listArea}>
                                <section className={style.leftArea}>
                                    {
                                        this.props.sortDataList.map((dataList,i) => {
                                            return(
                                                <label htmlFor={"mainJobType"+i}>
                                                    <a className={style.mainList}>{dataList.key}</a>
                                                    <input type="radio" name="radioCheck" id={"mainJobType"+i} value={dataList.value} className={style.radio} onChange={() => {this.checkJobType(dataList.value,dataList.key,{i})}}/>
                                                </label>
                                            )
                                        })
                                    }
                                </section>
                                <section className={style.rightArea}>
                                    <section className={style.rightList}>
                                        {
                                            this.props.sortDataList[this.state.linkNum].childrenList ? (
                                                this.props.sortDataList[this.state.linkNum].childrenList.map((dataList,i) => {
                                                    return(
                                                        <label htmlFor={"childJobType" + i}>
                                                            <a className={style.mainList}>{dataList.key}</a>
                                                            <input type="radio" name="radioCheckChile" id={"childJobType" + i} value={dataList.value} className={style.radio} onChange={() => {this.submitJobType(dataList.value,dataList.key)}}/>
                                                        </label>
                                                    )
                                                })
                                            ) : ("")
                                        }
                                    </section>
                                </section>
                            </section>
                        ) : (
                        <section className={style.listArea}>
                            <section className={style.singleArea}>
                                {
                                    this.props.sortDataList.map((dataList,i) => {
                                        return(
                                            <label htmlFor={dataList.value} key={i}>
                                                <a className={style.mainList}>{dataList.key}</a>
                                                <input type="radio" name="radioCheck" id={dataList.value} value={dataList.value} className={style.radio} onChange={() => {this.checkSort(dataList.value,dataList.key)}}/>
                                            </label>
                                        )
                                    })
                                }
                            </section>
                            <section className={style.shadow} onClick={this.props.shadowHandle}></section>
                        </section>)
                    ) : (
                        ""
                    )
                }
            </section>
        )
    }
}