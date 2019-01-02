import React from "react";

export default class FooterForInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className="e-footer flex flex-row flex-start align-center">
                {this.props.children}
            </section>
        )
    }
}