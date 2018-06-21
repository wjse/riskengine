import "../../../static/scss/chart.scss";
import React from "react";
import Panel from "../dashboard/panel";
import Ajax from "../../service/ajax";
import Echarts from "echarts/lib/echarts";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/grid";
import "echarts/lib/chart/line";
import BaseComponent from "../../service/base-component";
import TimeButtonsGroup from "../../util/time-buttons-group";

export default class AccessStatisticsChart extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
        this.a = new Ajax();
        this.p = props;
    };

    componentWillMount(){
        this.loadActiveTimeQuantum();
        this.loadIpPortrayalCount(this.p.defaultShowCount , this.p.intranetType ,"intranetBarChart");
        this.loadIpPortrayalCount(this.p.defaultShowCount , this.p.externalType , "externalBarChart");
    };

    loadIpPortrayalCount(showCount , type , chartId , title){
        this.a.get("/statistics/ip-portrayal-count" , {
            showCount : showCount,
            type : type
        }).then((resp) => {
            let data = resp.data.data;
            if(!data){
                return;
            }

            let ipData = [],
                countData = [];

            for (let i in data){
                ipData.push(data[i].ip);
                countData.push({
                    name : data[i].ip,
                    value : data[i].count
                })
            }

            let c1 , c2 = null;
            let title = "外网风险IP画像统计";
            if(type == this.props.intranetType){
                c1 = "#7ee9ff" , c2 = "#3b8cff" , title = "内网风险IP画像统计";
            }
            this.barChart(ipData , countData , chartId , title , c1 , c2);
        });
    };

    loadActiveTimeQuantum(){
        this.a.get("/statistics/active-time-quantum").then((resp) => {
            let data = resp.data.data;

            let legendData = [] ,
                xAxisData = [],
                seriesData = [];

            if(!data){
                return;
            }

            for(let k in data){
                legendData.push(k);

                for(let i = 0 ; xAxisData.length < 24; i++){
                    xAxisData.push(data[k][i].time);
                }

                seriesData.push({
                    name : k,
                    type : "line",
                    smooth : true,
                    data : function() {
                        let dataArray = [];
                        for(let i = 0 ; i < data[k].length ; i++){
                            dataArray.push(data[k][i].count);
                        }
                        return dataArray;
                    }.call()
                });
            }

            this.lineChart(legendData , xAxisData , seriesData);
        });
    };

    lineChart(legendData , xAxisData , seriesData){
        let chart = Echarts.init(document.getElementById("lineChart"));
        chart.setOption({
            title : {
                text : "日访问分布统计"
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data : legendData
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data : xAxisData
            },
            yAxis : {
                name : "访问量",
                type : 'value'
            },
            series : seriesData
        });
    };

    barChart(ipData , countData , chartId , title , c1 , c2){
        let chart = Echarts.init(document.getElementById(chartId));
        chart.setOption({
            title : {
                text : title
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                }
            },
            xAxis: {
                type: 'value',
                position : "top"
            },
            yAxis: {
                data: ipData,
                inverse : true
            },
            series: [{
                name:"统计次数",
                data: countData,
                type: 'bar',
                itemStyle: {
                    normal: {
                        "color": new Echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            "offset": 0,
                            "color": c1 ? c1 : "#ffb069" // 0% 处的颜色
                        }, {
                            "offset": 1,
                            "color": c2 ? c2 : "#ec2e85" // 100% 处的颜色
                        }], false)
                    }
                }
            }]
        });
        chart.resize();
    };

    buttonClick(type , chartId , btn){
        this.loadIpPortrayalCount(btn.value , type , chartId);
    };

    render(){
        return (
            <section id="main-content" className="chart">
                {BaseComponent.pageHeader("统计","访问量统计")}
                <Panel width="12" body={<div className="chart-body" id="lineChart"></div>}/>
                <Panel width="12"
                       title="统计排名"
                       body={<div className="chart-body" id="intranetBarChart"></div>}
                       right={<TimeButtonsGroup buttons={this.props.defaultButtons}
                                                click={this.buttonClick.bind(this , this.props.intranetType , "intranetBarChart")}/>}/>
                <Panel width="12"
                       title="统计排名"
                       body={<div className="chart-body" id="externalBarChart"></div>}
                       right={<TimeButtonsGroup buttons={this.props.defaultButtons}
                                                click={this.buttonClick.bind(this , this.props.externalType , "externalBarChart")}/>}/>
            </section>
        );
    };
};

AccessStatisticsChart.defaultProps = {
    intranetType : 1, //内外ip画像类型值
    externalType : 0, //外网ip画像类型值
    defaultShowCount : 10,
    defaultButtons : [{
        text : "前10条",
        value : 10
    },{
        text : "前50条",
        value : 50
    },{
        text : "前100条",
        value : 100
    }]
};