import React from 'react';
import Utils from '../../../../store/main/utils'

export default class HistoryBack extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className="e-header-back" style={this.props.style}>
                {
                    this.props.onHandle ? (
                        <a onClick={() => this.props.onHandle()}></a>
                    ) : (
                        <a onClick={() => {Utils.historyBack()}}></a>
                    )
                }
            </section>
        )
    }
}