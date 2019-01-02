import React from 'react';
import { Link } from 'react-router'

export default class SearchIcon extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className="e-header-search">
                {
                    this.props.template == 'searchJianliku' ? (
                        <Link to="/searchJianliku"></Link>
                        ) : (
                        <Link to="/search"></Link>
                    )
                }
            </section>
        )
    }
}