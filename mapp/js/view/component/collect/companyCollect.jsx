import React from "react";
import {Link} from "react-router";
import style from "./css/collect.css";
var Action = require('../../../store/main/collectAction.js')

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import Wrap from '../common/wrap.jsx'
import NoData from '../common/noData.jsx'

export default class CompanyCollect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyList: []
        }
        this.page = 1;
    }
    
    componentWillMount = () => {
        this.getWatchCompanyList(this.page);
    }

    getWatchCompanyList = (page) => {
        let self = this;
        Action.getWatchCompanyList(page,function (data) {
            self.setState({
                companyList: data.getWatchCompanyList ? data.getWatchCompanyList : []
            })
        })
    }

    render() {
        return (
            <section>
                <Header title="公司收藏">
                    <HistoryBack/>
                </Header>
                <section className="wrapWithHeader">
                    {
                        this.state.companyList.length ? (
                            this.state.companyList.map((company,i) => {
                                return(
                                    <Wrap marginTop="0.16rem" key={i}>
                                        <Link to={{ pathname: '/companyInfo/:' + company.enterpriseId,query:{ enterpriseId : company.enterpriseId }}} className={style.listArea}>
                                            <img src={company.enterprise.logoUrl}/>
                                            <section className={style.textArea}>
                                                <h3>{company.enterprise.name}</h3>
                                                <p>{company.enterprise.industry}</p>
                                            </section>
                                        </Link>
                                    </Wrap>
                                )
                            })
                        ) : (
                            <NoData/>
                        )
                    }
                </section>
            </section>
        )
    }
}