import React from "react";

export default class Logo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            iconStyle: {
                margin: this.props.margin ? this.props.margin : '',
                width: this.props.width,
                height: this.props.height
            }
        }
    }

    render() {
        return (
            <img style={this.state.iconStyle} src={this.props.imageUrl}/>
        )
    }
}