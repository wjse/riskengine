import React from "react";
import DashboardCard from "./card"
import Panel from "./panel";

import UserChart from "../chart/user-chart";
import AppChart from "../chart/app-chart";
import DeviceChart from "../chart/device-chart";
import HDFSMonitor from "../chart/hdfs-monitor";
import Ajax from "../../service/ajax";
import cardListJson from "../../../data/card.json";

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {cardList : []};
    };

    componentWillMount(){
        this.loadCards();
    };

    componentDidMount(){
        this.interval = setInterval(() => {
            this.loadCards();
        } ,30000);
    };

    componentWillUnmount(){
        clearInterval(this.interval);
    };

    loadCards(){
        new Ajax().get("/dashboard/card").then((resp) => {
            let cardList = this.props.cardList;
            if(resp && resp.data.data && resp.data.data.length > 0){
                let data = resp.data.data;
                for(let i in data){
                    for(let j in cardList){
                        if(data[i].type == cardList[j].type){
                            cardList[j].count = data[i].count
                        }
                    }
                }
            }
            this.setState({
                cardList : cardList
            });
        });
    };

    render(){
        return (
            <section id="main-content">
                <div className="row">
                    {this.state.cardList.map((card , i) => {
                        return <DashboardCard key={i} card={card}/>
                    })}
                </div>
                <div className="row">
                    <Panel title="本周用户访问统计" width="6" body={<UserChart/>}/>
                    <Panel title="上周应用访问排行" width="6" body={<AppChart/>}/>
                    <Panel title="用户常用设备总计" width="4" body={<DeviceChart/>}/>
                    <Panel title="HDFS状态" width="8" body={<HDFSMonitor/>}/>
                </div>
            </section>
        );
    };
};

Dashboard.defaultProps = {
    cardList : cardListJson
};