import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchKey: this.props.searchKey
        }
    }

    inputHandle = (e) => {
        this.setState({
            searchKey: e.target.value
        })
    }

    searchHandle = () => {
        if(window.event.keyCode == 13){
            if(this.state.searchKey.replace(/(^s*)|(s*$)/g, "").length != 0) {
                this.props.handle(this.state.searchKey);
            }else{
                return false;
            }
        }
    }

    render() {
        return (
            <section className="e-header-search-bar flex flex-row flex-start align-center">
                <span></span>
                <input type="text" placeholder={this.props.placeholder} value={this.state.searchKey} className="flex1" onChange={this.inputHandle.bind(this)} onKeyDown={() => {this.searchHandle()}}/>
            </section>
        )
    }
}