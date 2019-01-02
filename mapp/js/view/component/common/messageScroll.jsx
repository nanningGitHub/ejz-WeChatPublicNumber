import React from "react";
import style from "./css/messageScroll.css";

//导入组件样式

export default class MessageScroll extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate = () => {
        var mySwiper = new Swiper ('.swiper-container-message', {
            direction : 'vertical',
            loop: true,
            autoplay: 3000,//可选选项，自动滑动
        });
    }

    render() {
        return (
            <section className={style.messageArea}>
                <section className={style.message} ref="message">
                    <div className="swiper-container-message">
                        <div className="swiper-wrapper">
                            {
                                this.props.messageList.map((messageLists, i) => {
                                    return (
                                        <div className="swiper-slide">
                                            <p className={style.messageContent}>{messageLists.messageContent}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}