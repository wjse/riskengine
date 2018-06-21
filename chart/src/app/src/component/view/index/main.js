import "../../../static/scss/index-main.scss";
import React from "react";
import PubSub from "pubsub-js";

import Dashboard from "../dashboard/dashboard";
import RuleListView from "../list/rule-list";
import ManMachineChart from "../chart/man-machine-chart";
import Router from "./router";
import RuleChart from "../chart/rule-chart";
import UserListView from "../list/user-list";
import RoleListView from "../list/role-list";
import MenuListView from "../list/menu-list";
import AccessStatisticsChart from "../statistics/access-statistics-chart";
import RiskUserStatView from "../statistics/risk-user-stat";
import DataSourceList from "../dynamic/data-source-list";
import QuerySqlList from "../dynamic/query-sql";
import ChartList from "../dynamic/chart-list";

export default class IndexMain extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLeft : false,
            menu : {},
            path : null,
            iFrame : false
        };
    };

    componentWillMount(){
        this.menuFirst = PubSub.subscribe("index.first.menu" , (topic , menu) => {
            if(menu){
                this.setState({menu : menu});
            }
        });
    };

    componentDidMount(){
        this.pubToken = PubSub.subscribe("index.header.isShowAside" , (topic , isLeft) => {
            this.setState({
                isLeft: !isLeft
            });
        });
        this.pubForward = PubSub.subscribe("forward" ,(topic , menu) => {
            this.setState({
                menu: menu,
                path : menu.path
            });
        });
        this.iFrameForward = PubSub.subscribe("forwardToIFrame" , (topic , menu)=>{
            this.setState({
                menu : menu,
                path : menu.path
            });
        });
        this.errorNotify = PubSub.subscribe("500",() => {
            this.setState({path : "/500"});
        });
    };

    componentWillUnmount(){
        PubSub.unsubscribe(this.pubToken);
        PubSub.unsubscribe(this.pubForward);
        PubSub.unsubscribe(this.iFrameForward);
        PubSub.unsubscribe(this.menuFirst);
        PubSub.unsubscribe(this.errorNotify);
    };

    renderView(){
        return (
            <Router path={this.state.menu.path}>
                <Router path="/dashboard" view={<Dashboard/>}/>

                <Router path="/risk/man" view={<ManMachineChart/>}/>
                <Router path="/risk/rule" view={<RuleChart/>}/>
                <Router path="/statistics/access" view={<AccessStatisticsChart/>}/>
                {<Router path="/statistics/risk-user-stat" view={<RiskUserStatView/>}/>}

                <Router path="/rule-list" view={<RuleListView/>}/>

                <Router path="/system/user" view={<UserListView/>}/>
                <Router path="/system/role" view={<RoleListView/>}/>
                <Router path={"/system/menu"} view={<MenuListView/>}/>

                <Router path={"/dynamic/data-source"} view={<DataSourceList/>}/>
                <Router path={"/dynamic/data-query-sql"} view={<QuerySqlList/>}/>
                <Router path={"/dynamic/dynamic-chart"} view={<ChartList/>}/>
            </Router>
        );
    };

    render(){
        return (
            <section className={"main-content-wrapper" + (this.state.isLeft ? " main-content-toggle-left" : "")}>
                {"iFrame" == this.state.menu.target ? <iframe id="iFrame" name="iFrame" src={this.state.path}></iframe>
                                                    : this.renderView()}
            </section>
        );
    };
};