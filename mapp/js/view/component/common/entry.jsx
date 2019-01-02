import React from 'react';
import { Link } from 'react-router';


export default class Entry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className="e-entry flex flex-row flex-start align-center">
                {
                    this.props.navList && this.props.navList.length ? (
                            this.props.navList.map((nav,i) => {
                                return(
                                    <section className="e-entry-item">
                                        {
                                            i == 0 ? (
                                                    <section className="e-entry-border-right"></section>
                                                ) : (
                                                    i == 3 ? (
                                                            <section className="e-entry-border-left"></section>
                                                        ) : (
                                                            <section className="e-entry-border-both"></section>
                                                        )
                                                )
                                        }
                                        <Link to={nav.toUrl}>
                                            <img src={nav.imageUrl}/>
                                            <span>{nav.title}</span>
                                        </Link>
                                    </section>
                                )
                            })
                        ) : ('')
                }
            </section>
        )
    }
}