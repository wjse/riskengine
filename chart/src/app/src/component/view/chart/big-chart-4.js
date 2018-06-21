import React from "react";
import Echarts from "echarts/lib/echarts";
import "echarts/lib/chart/gauge";
import "echarts/lib/component/tooltip";

export default class BigChart4 extends React.Component{

    componentDidMount(){
        this.chart();
    };



    chart(){
        let chart = Echarts.init(document.getElementById("bigChart4"));
        chart.setOption({
            title: {
                text: '风险预警',
                textStyle : {
                    color : "#ffffff"
                }
            },
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    name: '预警值',
                    type: 'gauge',
                    radius : "100%",
                    title : {
                        color : "#ffffff"
                    },
                    detail: {formatter:'{value}%'},
                    data: [{value: 18, name: '预警阀值'}]
                }
            ]
        });
    };

    render(){
        return <div id="bigChart4" style={{height : "250px"}}></div>;
    };
};