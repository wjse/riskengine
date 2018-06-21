export default class ChartDataConverter{

    static convert(baseArray , dataArray , timeArray){
        baseArray.sort((a ,b ) => {
            if(isNaN(a.time) && a.time.indexOf(":") > 0){
                return parseInt(a.time.split(":")[0]) - parseInt(b.time.split(":")[0]);
            }else{
                return new Date(a.time).getTime() - new Date(b.time).getTime();
            }
        }).forEach((r) => {
            if(timeArray){
                if(isNaN(r.time)){
                    timeArray.push(r.time);
                }else{
                    let date = new Date(r.time);
                    timeArray.push(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
                }
            }

            dataArray.push(r.count);
        });
    };
};