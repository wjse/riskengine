import React from "react";
import Echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import Ajax from "../../service/ajax";

export default class TotalDeviceChart extends React.Component{

    componentWillMount(){
        new Ajax().get("/dashboard/device").then((resp) => {
            if(resp && resp.data.status == 200 && resp.data.data){
                let nameData = [] , data = [];
                for(let i in resp.data.data){
                    nameData.push(resp.data.data[i].name);
                    data.push({
                        value : resp.data.data[i].count,
                        name : resp.data.data[i].name
                    });
                }

                this.chart(nameData,data);
            }
        });
    };

    chart(nameData , data){
        let chart = Echarts.init(document.getElementById("pie"));
        chart.setOption({
            tooltip: {
                trigger: "item",
                show: true,
                formatter:(params) => {
                    return params.data.name + " : " + params.data.value;
                }
            },
            legend: {
                orient: "vertical",
                x: "left",
                data:nameData
            },
            series: [{
                name:"常用设备统计",
                type:"pie",
                radius: ["50%", "100%"],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: "center"
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: "20",
                            fontWeight: "bold"
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:data
            }
            ]
        });
    };

    render(){
        return (<div id="pie" style={{height : this.props.height ? this.props.height : "300px"}}></div>);
    };
};