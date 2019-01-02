import React from "react";
import style from "./css/sort.css";

//导入组件样式

//导入子组件


export default class SortList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let linkNum = this.props.linkNum
        return (
            <section className={style.listArea}>
                {
                    this.props.template == "single-row" ? (
                        <section className={style.singleArea}>
                            {
                                this.props.data.map((dataList,i) => {
                                    return(
                                        <label htmlFor={dataList.id}>
                                            <a ref={i} key={i} className={style.mainList} onClick={() => {this.props.check(this,[dataList.name,dataList.value])}}>{dataList.name}</a>
                                            <input type="radio" name="radioCheck" id={dataList.id} value={dataList.value} className={style.radio}/>
                                        </label>
                                    )
                                })
                            }
                        </section>
                    ) : (
                        <section className={style.listArea}>
                            <section className={style.leftArea}>
                                <label htmlFor="all">
                                    <a className={style.mainList} onClick={() => {this.props.check(this,['全部',""])}}>全部</a>
                                    <input type="radio" name="radioCheck" id="all" value="" className={style.radio}/>
                                </label>
                                {
                                    this.props.data.map((dataList,i) => {
                                        return(
                                            <label htmlFor={dataList.id}>
                                                <a ref={i} key={i} className={style.mainList} onClick={() => {this.props.linkage(this,[dataList.name,dataList.value,dataList.sort])}}>{dataList.name}</a>
                                                <input type="radio" name="radioCheck" id={dataList.id} value={dataList.value} className={style.radio}/>
                                            </label>
                                        )
                                    })
                                }
                            </section>
                            <section className={style.rightArea}>
                                <section className={style.rightList}>
                                    {
                                        this.props.data[linkNum].childData.map((dataList) => {
                                            return(
                                                <label htmlFor={dataList.id}>
                                                    <a className={style.mainList} onClick={() => {this.props.check(this,[dataList.name,dataList.value])}}>{dataList.name}</a>
                                                    <input type="radio" name="radioCheckChile" id={dataList.id} value={dataList.value} className={style.radio}/>
                                                </label>
                                            )
                                        })
                                    }
                                </section>
                            </section>
                        </section>
                    )
                }
            </section>
        )
    }
}