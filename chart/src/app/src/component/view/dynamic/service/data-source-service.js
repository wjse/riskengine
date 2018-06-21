import Ajax from "../../../service/ajax";

export default class DataSourceService{

    constructor(){
        this.a = new Ajax();
    };

    loadDataSource(callback , pageNum){
        if(!pageNum){
            pageNum = 1;
        }
        this.a.get("/data-source?pageNum=" + pageNum).then((resp) => {
            if(resp && resp.data.data){
                if(callback){
                    callback.call(this,resp.data.data);
                }
            }
        });
    };

    loadStartUpDataSource(callback , list){
        this.a.get("/data-source?status=STARTUP").then((resp) => {
            if(resp && resp.data.data){
                if(callback){
                    let data = resp.data.data;
                    data.forEach((o) => {
                        list.push({name : o.name , value : o.id});
                    });

                    callback.call(this , list);
                }
            }
        });
    };
};