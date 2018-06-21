import moment from "moment";

export default class Converter{

    defaultStatusArray(){
        return [{
                name : "正常" , value : "NORMAL"
            },{
                name : "禁用" , value : "DISABLED"
            },{
                name : "启用" , value : "STARTUP"
            },{
                name : "停用" , value : "SHUTDOWN"
            }];
    };

    status(value){
        if(!value){
            return "";
        }

        let array = this.defaultStatusArray();
        for(let i = 0 ; i < array.length ; i++){
            let o = array[i];
            if(o.value == value){
                return o.name;
            }
        }
    };

    date(time){
        return moment(time).format("YYYY-MM-DD");
    };

    statusArray(){
        return [{
            name : "正常" , value : "NORMAL"
        },{
            name : "禁用" , value : "DISABLED"
        }]
    };
};