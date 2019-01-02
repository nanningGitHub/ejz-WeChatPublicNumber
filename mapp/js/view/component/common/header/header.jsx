import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header className="e-header">
                {this.props.children}
                <h1>{this.props.title}</h1>
            </header>
        )
    }
}