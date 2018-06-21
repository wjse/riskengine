package com.bamboocloud.risk.chart.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.SocketException;
import java.util.Base64;

public class AmbariRestService {

    private static final String AUTHORIZATION = "Authorization";
    private static final String AUTH_BASIC = "Basic";
    private static final String X_REQUESTED_BY = "X-Requested-By";
    private static Logger logger = LoggerFactory.getLogger(AmbariRestService.class);

    private String ambari;
    private String user;
    private String password;
    private String requestedBy;

    public JSONArray hosts() {
        JSONArray hosts = readHosts();
        if(null == hosts){
            return null;
        }

        JSONArray array = new JSONArray();
        for(int i = 0 ; i < hosts.size() ; i++){
            JSONObject host = getHostDetail(hosts.getJSONObject(i));
            array.add(host);
        }

        return array;
    }

    public void setAmbari(String ambari) {
        this.ambari = ambari;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRequestedBy(String requestedBy) {
        this.requestedBy = requestedBy;
    }

    private JSONArray readHosts(){
        String resp = executeHttp(ambari);
        if(null == resp){
            return null;
        }

        JSONObject json = JSONObject.parseObject(resp);
        if(null == json || !json.containsKey("items")){
            return null;
        }

        return json.getJSONArray("items");
    }

    private String executeHttp(String url){
        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet method = new HttpGet(url);

        method.addHeader(AUTHORIZATION , String.format("%s %s" , AUTH_BASIC, Base64.getEncoder().encodeToString((user + ":" + password).getBytes())));
        method.addHeader(X_REQUESTED_BY,requestedBy);

        try {
            CloseableHttpResponse response = client.execute(method);
            if(200 != response.getStatusLine().getStatusCode()){
                return null;
            }

            return getResponseString(response.getEntity().getContent());
        } catch (SocketException e){
            logger.error(e.getMessage(),e);
        } catch (IOException e) {
            logger.error(e.getMessage(),e);
        }

        return null;
    }

    private String getResponseString(InputStream in) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        StringBuffer buffer = new StringBuffer();

        String tmp;
        while((tmp = reader.readLine()) != null){
            buffer.append(tmp);
        }

        reader.close();
        return buffer.toString();
    }

    private JSONObject getHostDetail(JSONObject host){
        String href = host.getString("href");
        String resp = executeHttp(href);

        if(null == resp){
            return null;
        }

        return JSONObject.parseObject(resp);
    }
}
