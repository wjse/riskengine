import Converter from "./converter";


export default class DataSourceConverter extends Converter{

    typeArray(){
        return [{
            name : "oracle",
            value : "oracle"
        },{
            name : "mysql",
            value : "mysql"
        },{
            name : "sql server",
            value : "sqlserver"
        }];
    };
};