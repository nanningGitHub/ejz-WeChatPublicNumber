import React from "react";
import {Link} from "react-router";

export default class Location extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className="e-header-location flex flex-row flex-start align-center">
                <span></span>
                <Link to="/city">{this.props.cityName}</Link>
            </section>
        )
    }
}