import axios from "axios";
import Config from "../../config";
import PubSub from "pubsub-js";

export default class Ajax{
    constructor(multipart){
        this.axios = axios.create({
            baseURL: Config.server(),
            timeout: 0,
            headers: {
                "X-Custom-Header": "foobar",
                "Token" : window.sessionStorage.getItem("token"),
                "Content-Type" : multipart ? "application/x-www-form-urlencoded" : "application/json"
            }
        });

        this.axios.interceptors.response.use(function(resp){
            return resp;
        },function(error){
            if(!error || !error.response){
                PubSub.publish("500");
            }else if(error.response.status == 401){
                window.sessionStorage.removeItem("token");
                window.sessionStorage.removeItem("user");
                PubSub.publish("isLogin" , false);
            }else{
                PubSub.publish("500");
            }
        });
    };

    get(api , params , config){
        let url = api;
        if(params){
            url += "?";
            for (let k in params){
                url += k + "=" + params[k] + "&";
            }

            url = url.substring(0 , url.length - 1);
        }
        return this.axios.get(url , config);
    };

    delete(api , config){
        return this.axios.delete(api , config);
    };

    post(api , data , config){
        return this.axios.post(api , data , config);
    };

    put(api , data , config){
        return this.axios.put(api , data , config);
    };
};