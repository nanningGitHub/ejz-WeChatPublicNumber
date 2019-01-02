import React from "react";
import {Link} from "react-router";

export default class HeaderContent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className="e-header-content flex flex-row flex-end align-center">
                {
                    this.props.url ? (
                        <Link to={this.props.url}>
                            {this.props.title}
                        </Link>
                    ) : (
                        <a onClick={() => this.props.onHandle()}>
                            {this.props.title}
                        </a>
                    )
                }
            </section>
        )
    }
}