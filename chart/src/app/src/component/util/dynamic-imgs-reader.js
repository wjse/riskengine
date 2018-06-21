export default class DynamicImgsReader{
    constructor(){
        this.dir = require.context("../../static/img/dynamic" , true , /\.png$/);
    };

    getImgs(){
        let array = [];
        this.dir.keys().forEach(item => {
            array.push({
                img : this.dir(item),
                type : item.replace("./","").replace(".png","")
            });
        });

        return array;
    };
};