package com.bamboocloud.risk.chart.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.bamboocloud.risk.chart.dynamic.DynamicHtmlService;
import com.bamboocloud.risk.chart.dynamic.LineOrBarOptionService;
import com.bamboocloud.risk.chart.dynamic.PieOptionService;
import com.bamboocloud.risk.chart.dynamic.ScatterOptionService;
import com.bamboocloud.risk.db.entity.DynamicHtml;
import com.bamboocloud.risk.db.mapper.DynamicHtmlMapper;
import com.bamboocloud.risk.support.IdWorker;
import com.bamboocloud.risk.support.MapUtil;
import com.bamboocloud.risk.support.RequestUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
public class DynamicChartHtmlServiceImpl implements DynamicHtmlService {

    private static final String TEMPLATE = DynamicChartHtmlServiceImpl.class.getResource("/dynamic-html.template").getFile();

    private static Logger logger = LoggerFactory.getLogger(DynamicChartHtmlServiceImpl.class);

    private static String templateString;

    @Autowired
    private LineOrBarOptionService lineOrBarService;

    @Autowired
    private PieOptionService pieService;

    @Autowired
    private ScatterOptionService scatterService;

    @Autowired
    private DynamicHtmlMapper mapper;

    static{
        templateString = readTemplate(TEMPLATE);
    }

    private static String readTemplate(String path){
        try {
            BufferedReader reader = new BufferedReader(new FileReader(new File(path)));
            StringBuffer buffer = new StringBuffer();
            String tmp;
            while((tmp = reader.readLine()) != null){
                buffer.append(tmp);
            }
            reader.close();
            return buffer.toString();
        } catch (IOException e) {
            logger.error("Read html template file error." , e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public DynamicHtml build(JSONObject chartJSON) throws IOException {
        String type = chartJSON.getString("type");

        JSONObject option = new JSONObject();
        option.put("title" , MapUtil.newMap(new String[]{"text"} , new String[]{chartJSON.getString("text")}));

        if("bar".equals(type) || "line".equals(type)){
            lineOrBarService.option(chartJSON , option);
        }else if("pie".equals(type)){
            pieService.option(chartJSON , option);
        }else if("scatter".equals(type)){
            scatterService.option(chartJSON , option);
        }

        String optionString = option.toString().replaceAll("\"#" , "").replaceAll("#\"" , "");
        String htmlCode = templateString.replaceAll("#\\{option\\}" , optionString);

        DynamicHtml html = new DynamicHtml();
        html.setId(IdWorker.uuid());
        html.setPath(generateHtmlFile(htmlCode , htmlFileName(html.getId())));
        html.setCode(htmlCode);
        html.setUrl(htmlUrl(html.getId()));
        mapper.insert(html);

        return html;
    }

    @Override
    public void remove(String id) {
        DynamicHtml html = mapper.get(id);
        if(null == html){
           return;
        }

        File file = new File(html.getPath());
        file.delete();

        mapper.delete(id);
    }

    private String htmlUrl(String name) {
        return RequestUtil.getResourcePath(RequestUtil.getRequest() , String.format("/html/%s.html" , name));
    }

    private String generateHtmlFile(String htmlCode , String fileName) throws IOException{
        String folder = RequestUtil.getRealPath(RequestUtil.getRequest() , "/html");
        String fullFilePath = String.format("%s%s%s" , folder , File.separator , fileName);
        OutputStreamWriter writer = new OutputStreamWriter(new FileOutputStream(fullFilePath) , "utf-8");
        BufferedWriter bufferedWriter = new BufferedWriter(writer);
        bufferedWriter.write(htmlCode);
        bufferedWriter.close();
        writer.close();
        return fullFilePath;
    }

    private String htmlFileName(String name){
        return String.format("%s.html" , name);
    }
}


