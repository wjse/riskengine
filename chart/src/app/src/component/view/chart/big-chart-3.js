import React from "react";
import Echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";

export default class BigChart3 extends React.Component{

    componentDidMount(){
        this.chart();
    };

    chart(){
        let chart = Echarts.init(document.getElementById("bigChart3"));
        chart.setOption({
            title: {
                text: '风险拦截趋势',
                textStyle : {
                    color : "#ffffff"
                }
            },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisLine : {
                    lineStyle : {
                        color : "#ffffff"
                    }
                },
                axisLabel : {
                    textStyle:{
                        color : "#ffffff"
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine : {
                    lineStyle : {
                        color : "#ffffff"
                    }
                },
                axisLabel : {
                    textStyle:{
                        color : "#ffffff"
                    }
                }
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true,
                lineStyle : {
                    color : "#28bcff"
                }
            }]
        });
    };

    render(){
        return <div id="bigChart3" style={{height : "250px"}}></div>;
    };
};