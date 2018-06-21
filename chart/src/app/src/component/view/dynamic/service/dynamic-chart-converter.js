import Converter from "../../list/converter/converter";

export default class DynamicChartConverter extends Converter{

    constructor(){
        super();
        this.typeData = {
            bar : "柱状图",
            line : "曲线图",
            pie : "饼图",
            scatter : "热点图"
        };
    };

    type(k){
        return this.typeData[k];
    };

    dataTypes(){
        return [{
            name : "自定义",
            value : "custom"
        },{
            name : "SQL",
            value : "sql"
        }];
    };
};