export default class Config{
    static server(){
        let _env = process.env.NODE_ENV;
        let _server = "http://localhost:8080/chart";

        switch (_env){
            case "prod" : _server = "pord";
            case "qa" : _server = "http://192.168.2.141:8080/chart";
        }

        return _server;
    }
}