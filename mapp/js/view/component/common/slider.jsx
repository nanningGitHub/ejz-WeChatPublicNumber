import React from "react";
import style from "./css/slider.css";

//导入组件样式

export default class Slider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startX: 0,
            endX: 0,
            translate: 0,
            scrollStyle: {
                transform: 'translateX(0)'
            }
        }
    }

    componentDidMount = () => {
        var mySwiper = new Swiper ('.swiper-container-scroll', {
            freeMode : true,
        });
    }

    render() {
        return (
            <section className={style.scroll}>
                <div className="swiper-container-scroll" style={{width: "100%"}}>
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            Slide 1
                        </div>
                        <div className="swiper-slide">
                            Slide 2
                        </div>
                        <div className="swiper-slide">
                            Slide 3
                        </div>
                        <div className="swiper-slide">
                            Slide 4
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}