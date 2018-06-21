import "../../../static/scss/chart.scss";
import React from "react";
import Panel from "../dashboard/panel";
import Ajax from "../../service/ajax";
import Echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/grid";
import "echarts/lib/chart/map";
import "echarts/lib/chart/scatter";
import "echarts/map/js/china";
import ChinaCityJson from "echarts/map/json/china-cities.json";
import Converter from "../../util/chart-data-converter";
import DatePickerGroup from "../../util/date-picker-group";
import TimeButtonsGroup from "../../util/time-buttons-group";
import BaseComponent from "../../service/base-component";

export default class ManMachineChart extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            lineBtn : 1 ,
            mapBtn : 1,
            isQuery : false
        };
        this.initGeoCoordMap();
        this.a = new Ajax();
    };

    initGeoCoordMap(){
        this.geoCoordMap = {};
        ChinaCityJson.features.forEach((json) => {
            this.geoCoordMap[json.properties.name] = json.properties.cp;
        });
    };

    componentWillMount(){
        this.loadAccessResultData();
        this.loadAccessCityData();
    };

    componentDidMount(){
        this.interval = setInterval(()=>{
            if(!this.state.isQuery){
                this.loadAccessResultData(this.state.lineBtn);
            }
            this.loadAccessCityData(this.state.mapBtn);
        },30000);
    };

    componentWillUnmount(){
        clearInterval(this.interval);
    };

    convertMapData(data){
        let res = [];
        data.forEach((d) => {
            let geoCoord = this.geoCoordMap[d.name];
            if(geoCoord){
                res.push({
                    name : d.name,
                    value : geoCoord.concat(d.count)
                });
            }
        });
        return res;
    };

    loadAccessResultData(type){
        this.a.get("/risk/access-result?timeType=" + (type ? type : 1)).then((resp) => {
            if(resp.data.data){
                this.parseAccessResultData(resp.data.data);
            }
        })
    };

    loadAccessResultDayData(startDate , endDate){
        let obj = {};
        this.setState({isQuery : true});
        if(startDate){
            obj.startDate = startDate._d.getTime()
        }

        if(endDate){
            obj.endDate = endDate._d.getTime()
        }
        this.a.get("/risk/access-result-day" , obj).then((resp) => {
            if(resp.data.data){
                this.parseAccessResultData(resp.data.data);
            }
        });
    };

    parseAccessResultData(data){
        let timeData = [],
            trueResultData = [],
            falseResultData = [];

        Converter.convert(data.trueResult , trueResultData , timeData);
        Converter.convert(data.falseResult , falseResultData);
        this.lineChart(timeData , trueResultData , falseResultData);
    };

    loadAccessCityData(type){
        this.a.get("/risk/access-city?timeType=" + (type ? type : 1)).then((resp) => {
            this.mapChart(resp.data.data);
        });
    };

    lineChart(timeData , trueResultData , falseResultData){
        let chart = Echarts.init(document.getElementById("lineChart"));
        chart.setOption({
            title : {text : "认证通过量趋势"},
            tooltip: {
                trigger: "axis"
            },
            legend: {
                data:["认证通过量","认证拦截量"]
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: timeData
            },
            yAxis: {
                type: "value"
            },
            series: [{
                name : "认证通过量",
                data: trueResultData,
                type: "line"
            },{
                name : "认证拦截量",
                data: falseResultData,
                type: "line"
            }]
        });
    };

    mapChart(data){
        let chart = Echarts.init(document.getElementById("mapChart"));
        let top5Total = 0;
        if(data){
            data.forEach((d) => {
                let geoCoord = this.geoCoordMap[d.name];
                if(geoCoord){
                    top5Total += d.count;
                }
            });
        }
        chart.setOption({
            title : {
                text : "访问请求城市分布",
                left : "center",
                top : 20,
                textStyle : {
                    color : "#ffffff"
                }
            },
            backgroundColor: "#404a59",
            tooltip : {
                trigger: "item",
                formatter : (params) => {
                    return params.data.name + " : " + params.data.value[2]
                }
            },
            geo: {
                map: "china",
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: "#323c48",
                        borderColor: "#111"
                    },
                    emphasis: {
                        areaColor: "#2a333d"
                    }
                }
            },
            series : [
                {
                    name: "访问量",
                    type: "scatter",
                    coordinateSystem: "geo",
                    data: this.convertMapData(data),
                    label: {
                        normal: {
                            formatter: "{b}",
                            position: "right",
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#ddb926"
                        }
                    }
                },
                {
                    name: "Top 5",
                    type: "effectScatter",
                    coordinateSystem: "geo",
                    data: this.convertMapData(data.sort((a, b) => {
                        return b.value - a.value;
                    }).slice(0, 6)),
                    symbolSize: (val) => {
                        return (val[2] / top5Total) * 50;
                    },
                    showEffectOn: "render",
                    rippleEffect: {
                        brushType: "stroke"
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: "{b}",
                            position: "right",
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#f4e925",
                            shadowBlur: 10,
                            shadowColor: "#333"
                        }
                    },
                    zlevel: 1
                }
            ]
        })
    };

    timeButtonClick(key , btn){
        let state = this.state;
        state[key] = btn.value;
        state.isQuery = false;
        this.setState(state);

        if("lineBtn" == key){
            this.loadAccessResultData(btn.value);
        }else if("mapBtn" == key){
            this.loadAccessCityData(btn.value);
        }
    };

    render(){
        return (
            <section id="main-content" className="chart">
                {BaseComponent.pageHeader("风险监控","人机认证")}
                <Panel width="12"
                       left={<DatePickerGroup click={this.loadAccessResultDayData.bind(this)}/>}
                       right={<TimeButtonsGroup click={this.timeButtonClick.bind(this,"lineBtn")}/>}
                       body={<div className="chart-body" id="lineChart"></div>}/>
                <Panel width="12"
                       right={<TimeButtonsGroup click={this.timeButtonClick.bind(this,"mapBtn")}/>}
                       body={<div className="chart-body" id="mapChart"></div>}/>
            </section>
        )
    };
};