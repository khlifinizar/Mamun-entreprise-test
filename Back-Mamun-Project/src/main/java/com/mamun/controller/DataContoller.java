package com.mamun.controller;

import java.io.File;
import java.io.FileInputStream;
import java.util.Date;
import java.util.List;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.mamun.model.Data;
import com.mamun.service.DataService;
@Controller
public class DataContoller {

	 @Autowired
	    DataService dataService;

	 public void setDataService(DataService dataService) {
		this.dataService = dataService;
	}
	 
	 @MessageMapping("/data")
	    @SendTo("/topic/data")
	 public String Data(Data message) throws Exception {
	        Date date = new Date();
	        //returns in milliseconds (time)
	        long timeMilli = date.getTime();
	        System.out.println("Time in milliseconds using Date class: " + timeMilli);
	        System.out.println("Controller done !!!!!" + message.toString());
	        List<String> fileData =dataService.flowNow(message.getFirstFile(),message.getSecondFile(),message.getNumberLines(),message.getCollationType());
	        File file = dataService.createCsvfromData(fileData,String.valueOf(timeMilli) );
	        FileInputStream input = new FileInputStream(file);
	        //Default joining in Tomcat Server
	        String base64String = Base64.encodeBase64String( org.apache.commons.io.IOUtils.toByteArray(input));
	        return base64String ;
	    }
}
