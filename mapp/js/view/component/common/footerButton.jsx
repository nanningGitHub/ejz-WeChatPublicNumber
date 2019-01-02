import React from "react";

export default class FooterButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className="e-footer-item flex flex-row flex-center align-center flex1">
                <section className="flex flex-row flex-start align-center" onClick={() => this.props.clickHandle()}>
                    <span style={{ backgroundImage: this.props.backgroundImage }}></span>
                    <p>{this.props.name}</p>
                </section>
            </section>
        )
    }
}