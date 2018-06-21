import React from "react";
import Echarts from "echarts/lib/echarts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/legend";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";

export default class BigChart1 extends React.Component{

    componentDidMount(){
        this.chart();
    };

    chart(){
        let chart = Echarts.init(document.getElementById("bigChart1"));
        let y = ["上海","成都","北京","天津","深圳","重庆","郑州","昆明"];
        let x = [421,14,123,312,423,346,567,34];
        x.sort((a , b) => {
            return a - b;
        });
        chart.setOption({
            title: {
                text: '用户访问趋势',
                textStyle : {
                    color : "#ffffff"
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日'],
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
            series: [
                {
                    name:'访问量',
                    type:'line',
                    data:[2101, 1201, 4145, 3173, 5122, 4103, 3180],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ],
                        symbolSize : 30
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        });
    };

    render(){
        return <div id="bigChart1" style={{height : "250px"}}></div>;
    };
};