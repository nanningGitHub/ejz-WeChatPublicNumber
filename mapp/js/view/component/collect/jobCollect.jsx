import React from "react";
import {Link} from "react-router";
import CollectAction from "../../../store/main/collectAction.js";

import Header from '../common/header/header.jsx'
import HistoryBack from '../common/header/historyBack.jsx'
import Wrap from '../common/wrap.jsx'
import JobList from '../common/jobList.jsx'
import NoData from '../common/noData.jsx'

export default class JobCollect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userFavoriteJob: []
        }
    }

    componentWillMount= () => {
        this.userFavoriteJob();
    }

    userFavoriteJob = () => {
        var self = this;
        CollectAction.userFavoriteJob(function (data) {
            self.setState({
                userFavoriteJob: data.userFavoriteJob ? data.userFavoriteJob : [],
            })
        })
    }

    render() {
        return (
            <section>
                <Header title="职位收藏">
                    <HistoryBack/>
                </Header>
                <section className="wrapWithHeader">
                    {
                        this.state.userFavoriteJob && this.state.userFavoriteJob.length ? (
                            this.state.userFavoriteJob.map((job,i) => {
                                return(
                                    <Wrap marginTop="0.16rem" key={i}>
                                        <Link to={{ pathname: '/jobInfo',query:{ article: JSON.stringify(job.jobofflinInfo) }}}>
                                            <JobList title={job.jobofflinInfo.title}
                                                     jobClass={job.jobofflinInfo.jobTypeStr.split(',')[1]}
                                                     jobTypeStr={job.jobofflinInfo.jobTypeStr.split(',')[1]}
                                                     settlementTypeStr={job.jobofflinInfo.settlementTypeStr}
                                                     price={job.jobofflinInfo.salaryStr}
                                                     salaryUnitStr={job.jobofflinInfo.salaryUnitStr}
                                                     startDate={job.jobofflinInfo.createdDate}
                                                     endDate={job.jobofflinInfo.endDate}
                                                     latitude={job.jobofflinInfo.latitude}
                                                     longitude={job.jobofflinInfo.longitude}
                                            />
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