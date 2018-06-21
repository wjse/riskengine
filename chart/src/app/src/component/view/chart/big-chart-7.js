import React from "react";
import Echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";

export default class BigChart7 extends React.Component{

    componentDidMount(){
        this.chart();
        let count = 11;
        this.interval = setInterval(() => {
            let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

            var data0 = this.option.series[0].data;
            var data1 = this.option.series[1].data;
            data0.shift();
            data0.push(Math.round(Math.random() * 1000));
            data1.shift();
            data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

            this.option.xAxis[0].data.shift();
            this.option.xAxis[0].data.push(axisData);
            this.option.xAxis[1].data.shift();
            this.option.xAxis[1].data.push(count++);

            this.chartObj.setOption(this.option);
        }, 2100)
    };

    componentWillUnmount(){
        clearInterval(this.interval);
    };

    chart(){
        this.chartObj = Echarts.init(document.getElementById("bigChart7"));
        this.option = {
            title: {
                text: '实时用户访问风险对照',
                textStyle : {
                    color : "#ffffff"
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
            dataZoom: {
                show: false,
                start: 0,
                end: 100
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine : {
                        lineStyle : {
                            color : "#ffffff"
                        }
                    },
                    axisLabel : {
                        textStyle:{
                            color : "#ffffff"
                        }
                    },
                    data: (function (){
                        var now = new Date();
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                },
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine : {
                        lineStyle : {
                            color : "#ffffff"
                        }
                    },
                    axisLabel : {
                        textStyle:{
                            color : "#ffffff"
                        }
                    },
                    data: (function (){
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(len + 1);
                        }
                        return res;
                    })()
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name: '风险拦截量',
                    max: 30,
                    min: 0,
                    boundaryGap: [0.2, 0.2],
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
                {
                    type: 'value',
                    scale: true,
                    name: '用户访问量',
                    max: 1200,
                    min: 0,
                    boundaryGap: [0.2, 0.2],
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
                }
            ],
            series: [
                {
                    name:'访问量',
                    type:'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    itemStyle : {
                        color : "#2ee6ff"
                    },
                    data:(function (){
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(Math.round(Math.random() * 1000));
                        }
                        return res;
                    })()
                },
                {
                    name:'拦截量',
                    type:'line',
                    lineStyle : {
                        color : "#ff4d2f"
                    },
                    data:(function (){
                        var res = [];
                        var len = 0;
                        while (len < 10) {
                            res.push((Math.random()*10 + 5).toFixed(1) - 0);
                            len++;
                        }
                        return res;
                    })()
                }
            ]
        };
        this.chartObj.setOption(this.option);
    };

    render(){
        return <div id="bigChart7" style={{height : "250px"}}></div>;
    };
};