import React from "react";
import Echarts from "echarts/lib/echarts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/legend";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";

export default class BigChart2 extends React.Component{

    componentDidMount(){
        this.chart();
    };

    chart(){
        let chart = Echarts.init(document.getElementById("bigChart2"));
        chart.setOption({
            title: {
                text: '访问统计',
                textStyle : {
                    color : "#ffffff"
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : {
                type : 'category',
                data : ['周一','周二','周三','周四','周五','周六','周日'],
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
            yAxis : {
                    type : 'value',
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
            series : [
                {
                    name:'E账通',
                    type:'bar',
                    data:[320, 332, 301, 334, 390, 330, 320],
                    itemStyle : {
                        color : "#6cdbff"
                    }
                },
                {
                    name:'安全通讯录',
                    type:'bar',
                    data:[120, 132, 101, 134, 90, 230, 210],
                    itemStyle : {
                        color : "#14226c"
                    }
                }
            ]
        });
    };

    render(){
        return <div id="bigChart2" style={{height : "250px"}}></div>;
    };
};