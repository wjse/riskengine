import React from "react";
import Echarts from "echarts/lib/echarts";
import "echarts-wordcloud";

export default class BigChart5 extends React.Component{

    componentDidMount(){
        this.chart();
    };

    chart(){
        let chart = Echarts.init(document.getElementById("bigChart5"));
        chart.setOption({
            title:{
                text:"访问设备",
                textStyle : {
                    color : "#ffffff"
                }
            },
            series: [{
                type: 'wordCloud',
                gridSize: 20,
                sizeRange: [12, 50],
                rotationRange: [0, 0],
                shape: 'circle',
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                Math.round(Math.random() * 255),
                                Math.round(Math.random() * 255),
                                Math.round(Math.random() * 255)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: [{
                    name: 'Android',
                    value: 10000,
                    textStyle: {
                        normal: {
                            color: '#61eeff'
                        },
                        emphasis: {
                            color: '#edff40'
                        }
                    }
                }, {
                    name: 'WIndows 7',
                    value: 6181
                }, {
                    name: 'IOS',
                    value: 4386
                }, {
                    name: 'Windows 8',
                    value: 4055
                }, {
                    name: 'Centos 7',
                    value: 2467
                }, {
                    name: 'Ubuntu 16.4',
                    value: 2244
                }, {
                    name: 'Ipad',
                    value: 1898
                }]
            }]
        });
    };

    render(){
        return <div id="bigChart5" style={{height : "250px"}}></div>;
    };
};