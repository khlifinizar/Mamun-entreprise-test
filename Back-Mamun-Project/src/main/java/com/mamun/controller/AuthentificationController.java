package com.mamun.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mamun.model.ResponseSender;

public class AuthentificationController {

	@RestController
	@RequestMapping(value = "/api")
	@CrossOrigin("*")
	public class AuthController {

	  
	    @GetMapping(value="/manager")
	    public ResponseSender managerEndPoint() {
	        return new ResponseSender("Hay");
	    }
	
}
}
