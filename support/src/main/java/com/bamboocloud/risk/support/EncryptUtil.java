package com.bamboocloud.risk.support;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import static org.apache.commons.lang.StringUtils.isEmpty;

public class EncryptUtil {
	
	private static final char[] HEX_DIGITS = {'0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f' };
	private static Logger logger = LoggerFactory.getLogger(EncryptUtil.class);

	private EncryptUtil() {
	}

	public static final String hex(String s,String type) {
		if(isEmpty(s)){
			return "";
		}
		try {
			byte[] strTemp = s.getBytes("utf-8");
			MessageDigest mdTemp = MessageDigest.getInstance(type);
			mdTemp.update(strTemp);
			byte[] md = mdTemp.digest();
			int j = md.length;
			char[] str = new char[j * 2];
			int k = 0;
			for (int i = 0; i < j; i++) {
				byte byte0 = md[i];
				str[k++] = HEX_DIGITS[byte0 >>> 4 & 0xF];
				str[k++] = HEX_DIGITS[byte0 & 0xF];
			}
			return new String(str);
		} catch (NoSuchAlgorithmException e) {
			logger.error(e.getMessage());
		} catch (UnsupportedEncodingException e) {
			logger.error(e.getMessage());
		}
		return "";
	}

	public static String base64Encode(String str, String charset){
		try {
			return Base64.encode(str.getBytes(charset));
		} catch (UnsupportedEncodingException e) {
			logger.error(e.getMessage());
			return "";
		}
	}

	public static String base64Decode(String str, String charset){
		try {
			return new String(Base64.decode(str),charset);
		} catch (UnsupportedEncodingException e) {
			logger.error(e.getMessage());
			return "";
		}
	}

	public static String encoder(String str, String charset){
		try {
			return URLEncoder.encode(str, charset);
		} catch (UnsupportedEncodingException e) {
			logger.error(e.getMessage());
			return "";
		}
	}
}
