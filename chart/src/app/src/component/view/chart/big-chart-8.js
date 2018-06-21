import React from "react";
import Echarts from "echarts/lib/echarts";
import "echarts/lib/chart/radar";

export default class BigChart8 extends React.Component{

    componentDidMount(){
        this.chart();
    };


    chart(){
        let chart = Echarts.init(document.getElementById("bigChart8"));
        chart.setOption({
            title: {
                text: '风险种类分布',
                textStyle:{
                    color:"#ffffff"
                }
            },
            radar: {
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    { name: 'IP规则风险', max: 6500},
                    { name: '设备规则风险', max: 16000},
                    { name: '地区规则风险', max: 30000},
                    { name: '密码规则风险', max: 38000}
                ]
            },
            series: [{
                name: '风险量',
                type: 'radar',
                data : [
                    {
                        value : [4300, 10000, 28000, 35000]
                    }
                ]
            }]
        });
    };

    render(){
        return <div id="bigChart8" style={{height : "250px"}}></div>;
    };
};