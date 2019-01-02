import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wrapStyle: {
                marginTop: this.props.marginTop
            }
        }
    }

    render() {
        return (
            <section style={this.state.wrapStyle} className="e-wrap">
                {this.props.children}
            </section>
        )
    }
}