import React from "react";
import Echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";

export default class BigChart6 extends React.Component{

    componentDidMount(){
        this.chart();
    };

    chart(){
        let chart = Echarts.init(document.getElementById("bigChart6"));
        let x = [10, 52, 200, 334, 390];
        let y = ['北京', '上海', '广州', '成都', '深圳'];
        x.sort((a,b) => {
            return a - b;
        });
        chart.setOption({
            title: {
                text: '访问城市排行',
                textStyle:{
                    color:"#ffffff"
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
                type : "value",
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
                type : 'category',
                data : y,
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
                    name:'访问量',
                    type:'bar',
                    data:x
                }
            ]
        });
    };

    render(){
        return <div id="bigChart6" style={{height : "250px"}}></div>;
    };
};