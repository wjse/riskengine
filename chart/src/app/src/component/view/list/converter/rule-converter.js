import Converter from "./converter";
import RuleTypeJson from "../../../../data/rule-type.json";

export default class RuleConverter extends Converter{

   time(value ,obj){
       if(!value){
           return "NA";
       }

       let array = value.split("_");
       let tmp;
       if(array[0] == "minute"){
           obj.timeType = "minute";
           tmp = "分钟";
       }else if(array[0] == "day"){
           obj.timeType = "day";
           tmp = "天"
       }
       obj.timeValue = array[1];
       return array[1] + tmp;
   };

   type(value){
       return RuleTypeJson[value];
   };
};