import "../../../static/scss/chart.scss";
import "react-datepicker/dist/react-datepicker.css";

import React from "react";
import Panel from "../dashboard/panel";
import DatePicker from "react-datepicker";
import Echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import Ajax from "../../service/ajax";
import Converter from "../../util/chart-data-converter";
import BaseComponent from "../../service/base-component";

export default class RuleChart extends React.Component{

    constructor(props){
        super(props);
        this.typeArray = ["ip" , "device" , "city","password"];
        this.state = {};
        this.typeArray.forEach((type) => {
            this.state[type] = {
                type : 1,
                isQuery : false,
                startDate : null,
                endDate : null
            };
        });
        this.a = new Ajax();
    };

    componentWillMount(){
        this.initLoad();
    };

    componentDidMount(){
        this.interval = setInterval(() => {
            this.typeArray.forEach((type) => {
                if(!this.state[type].isQuery){
                    this.initLoad(type);
                }
            });
        } , 30000);
    };

    componentWillUnmount(){
        clearInterval(this.interval);
    };

    initLoad(type){
        if(!type || "ip" == type){
            this.loadData("ipChart","#3398DB","用户IP地址规则拦截统计","ip");
        }

        if(!type || "device" == type){
            this.loadData("deviceChart","#db762d","用户常用设备规则拦截统计","device");
        }

        if(!type || "city" == type){
            this.loadData("cityChart","#5ddb9f","用户地址规则拦截统计","city");
        }

        if(!type || "password" == type){
            this.loadData("passwordChart","#e9d420","用户密码规则拦截统计","password");
        }

    };

    loadData(domId , chartColor , chartTitle , type){
        this.a.get("/risk/rule-"+ type +"?timeType=" + this.state[type].type).then((resp) => {
            if(resp.data.data){
                let data = resp.data.data,
                    timeArray = [],
                    dataArray = [];

                Converter.convert(data , dataArray , timeArray);
                this.chart(domId,chartColor,chartTitle,timeArray,dataArray);
            }
        });
    };

    loadIpDayData(domId , chartColor , chartTitle , type){
        let state = this.state , obj = {};
        if(state[type].startDate){
            obj.startDate = state[type].startDate._d.getTime();
        }

        if(state[type].endDate){
            obj.endDate = state[type].endDate._d.getTime();
        }

        this.a.get("/risk/rule-"+ type +"-day" , obj).then((resp) => {
            if(resp.data.data){
                let data = resp.data.data,
                    timeArray = [],
                    dataArray = [];

                Converter.convert(data , dataArray , timeArray);
                this.chart(domId,chartColor,chartTitle,timeArray,dataArray);
            }
        });
    };


    chart(domId , color , title , timeData  , data){
        let chart = Echarts.init(document.getElementById(domId));
        chart.setOption({
            color : [color],
            title : {
                text : title
            },
            tooltip : {
                trigger: "axis",
                axisPointer : {
                    type : "shadow"
                }
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis : [
                {
                    type : "category",
                    data : timeData,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : "value"
                }
            ],
            series : [
                {
                    name:"拦截量",
                    type:"bar",
                    barWidth: "60%",
                    data: data
                }
            ]
        });
    };

    search(type , callback){
        this.state[type].isQuery = true;
        callback.call();
    };

    timeButtons(type , callback){
        return (
            <div className="actions pull-right">
                <a className={"btn btn-square btn-" + (this.state[type].type == 1 ? "primary" : "default")} onClick={this.timeButtonClick.bind(this,type , 1 , callback.bind(this,1))}>今日</a>
                <a className={"btn btn-square btn-" + (this.state[type].type == 2 ? "primary" : "default")} onClick={this.timeButtonClick.bind(this,type , 2 , callback.bind(this,2))}>近7日</a>
                <a className={"btn btn-square btn-" + (this.state[type].type == 3 ? "primary" : "default")} onClick={this.timeButtonClick.bind(this,type , 3 , callback.bind(this,3))}>近30日</a>
            </div>
        )
    };

    timeButtonClick(type , timeType , callback){
        let state = this.state;
        state[type].type = timeType;
        state[type].isQuery = false;
        this.setState(state);

        callback.call(timeType);
    };

    datePicker(type , callback){
        return (
            <div className="date-picker">
                <form className="form-inline">
                    <div className="form-group">
                        <DatePicker className="form-control"
                                    locale="zh-cn"
                                    placeholderText="开始时间"
                                    selectsStart
                                    selected={this.state[type].startDate}
                                    startDate={this.state[type].startDate}
                                    endDate={this.state[type].endDate}
                                    onChange={this.setStartDate.bind(this,type)}/>
                    </div>
                    <div className="form-group">
                        <i className="fa  fa-long-arrow-right"></i>
                    </div>
                    <div className="form-group">
                        <DatePicker className="form-control"
                                    locale="zh-cn"
                                    placeholderText="结束时间"
                                    selectsEnd
                                    startDate={this.state[type].startDate}
                                    endDate={this.state[type].endDate}
                                    selected={this.state[type].endDate}
                                    onChange={this.setEndDate.bind(this,type)}/>
                    </div>
                    <a className="btn btn-default" onClick={this.search.bind(this , type ,callback.bind(this , type))}>
                        <i className="fa fa-search"/>
                    </a>
                </form>
            </div>
        );
    };

    setStartDate(type , date){
        let state = this.state;
        state[type].startDate = date;
        this.setState(state);
    };

    setEndDate(type , date){
        let state = this.state,
            startDate = state[type].startDate;

        state[type].endDate = date;

        if(startDate && startDate._d > date._d){
            state[type].endDate = startDate;
        }

        this.setState(state);
    };

    render(){
        return (
            <section id="main-content" className="chart">
                {BaseComponent.pageHeader("风险监控","规则认证")}
                <Panel width="12"
                       left={this.datePicker("ip" , this.loadIpDayData.bind(this,"ipChart","#3398DB","用户IP地址规则拦截统计"))}
                       right={this.timeButtons("ip" , this.loadData.bind(this,"ipChart","#3398DB","用户IP地址规则拦截统计","ip"))}
                       body={<div className="chart-body" id="ipChart"></div>}/>

                <Panel width="12"
                       left={this.datePicker("device" , this.loadIpDayData.bind(this,"deviceChart","#db762d","用户常用设备规则拦截统计"))}
                       right={this.timeButtons("device" , this.loadData.bind(this,"deviceChart","#db762d","用户常用设备规则拦截统计","device"))}
                       body={<div className="chart-body" id="deviceChart"></div>}/>

                <Panel width="12"
                       left={this.datePicker("city" , this.loadIpDayData.bind(this,"cityChart","#5ddb9f","用户地址规则拦截统计"))}
                       right={this.timeButtons("city" , this.loadData.bind(this,"cityChart","#5ddb9f","用户地址规则拦截统计","city"))}
                       body={<div className="chart-body" id="cityChart"></div>}/>

                <Panel width="12"
                       left={this.datePicker("password" , this.loadIpDayData.bind(this,"passwordChart","#e9d420","用户密码规则拦截统计"))}
                       right={this.timeButtons("password" , this.loadData.bind(this,"passwordChart","#e9d420","用户密码规则拦截统计","password"))}
                       body={<div className="chart-body" id="passwordChart"></div>}/>
            </section>
        );
    };
};