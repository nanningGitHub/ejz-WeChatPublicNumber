import React from "react";
import style from "./css/scrollPicker.css";
import Icon from "../common/icon.jsx";

//导入组件样式

//导入子组件

export default class ScrollPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectData: [],
            selectName: "",
            selectId: 0,
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            selectData: nextProps.data,
            selectName: nextProps.selectName ? nextProps.selectName : "",
            selectId: nextProps.selectId ? nextProps.selectId : this.state.selectId,
        })
    }

    select = () => {
        let self = this;
        let selectId = parseInt(this.state.selectId);
        let select = new IosSelect(
            1,
            [this.state.selectData],
            {
                title: '',
                itemHeight: 35,
                oneLevelId: selectId,
                callback: function (selectOneObj) {
                    self.setState({
                        selectName: selectOneObj.value,
                        selectId: selectOneObj.id
                    },function () {
                        self.props.handle(self.state.selectName,self.state.selectId)
                    })
                }
            });
    }

    render() {
        return (
            <section>
                {
                    this.props.address ? (
                        <section onClick={() => {this.select()}}>
                            <section className={style.addressList}>
                                <p>{this.state.selectName}</p>
                                <section className={style.addressIcon}>
                                    <Icon width=".2rem" height=".2rem" backgroundImage="url(/mapp/image/icon_down.png)"/>
                                </section>
                            </section>
                        </section>
                    ) : (
                        <section onClick={() => {this.select()}}>
                            <input type="text" placeholder={this.props.placeholder} className={style.inputFile} disabled="disabled" value={this.state.selectName}/>
                        </section>
                    )
                }
            </section>
        )
    }
}