import React from "react";
import style from "./css/radioPicker.css";

//导入组件样式

export default class RadioPicker extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount= () => {
        this.refs['radio-' + this.props.init].style.border = 'none';
        this.refs['radio-' + this.props.init].style.background = '#37d3cb';
        $('#' + this.props.radioName + this.props.init).prop("checked",true);
    }

    handleChange = (e) => {
        for(let i = 0; i < this.props.data.length; i++){
            this.refs['radio-' + i].style.border = '.02rem solid #dbedff';
            this.refs['radio-' + i].style.background = 'none';
        }
        this.refs[e].style.border = 'none';
        this.refs[e].style.background = '#37d3cb';
        let value = $('input[name=' + this.props.radioName +']:checked ').val();
        this.props.handle(value);
    }

    render() {
        return (
            <section className={style.radioArea}>
                {
                    this.props.data.map((datas,i)=>{
                        return(
                            <label labelFor={datas.value} key={i}>
                                <input id={this.props.radioName + datas.value} type="radio" name={this.props.radioName} value={datas.value} onChange={() => {this.handleChange(datas.ref)}}/>
                                <span ref={datas.ref}></span>
                                <p>{datas.key}</p>
                            </label>
                        )
                    })
                }
            </section>
        )
    }
}