import React from 'react';
import { Carousel } from 'antd-mobile';

export default class Banner extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className="e-banner">
                {
                    this.props.bannerList.length ? (
                            this.props.bannerList.length > 1 ?
                                (
                                    <Carousel className="my-carousel"
                                              autoplay
                                              autoplayInterval={5000}
                                              infinite
                                              dots={false}
                                    >
                                        {
                                            this.props.bannerList.map((banner,i) => {
                                                return(
                                                    <a href="#" className="e-banner-img" style={{height: this.props.height}} key={i} >
                                                        <img src={banner.imageUrl} />
                                                    </a>
                                                )
                                            })
                                        }
                                    </Carousel>
                                ) : (
                                    <a href="#" className="e-banner-img" style={{height: this.props.height}}>
                                        <img src={this.props.bannerList[0].imageUrl} />
                                    </a>
                                )
                        ) : ('')
                }
                {this.props.children}
            </section>
        )
    }
}