package com.cooksys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.entity.Itens;
import com.cooksys.repository.ItenReq;
import com.cooksys.service.ItenService;

@RestController
@RequestMapping("iten")
public class ItenController {
	
	@Autowired
	ItenService itenService;
	
	@RequestMapping("/get")
	public List<Itens> getAllItens() {
		System.out.println("Yo whwaa");
		return itenService.getAllItens();
	}
	
	@RequestMapping(value = "create", method = RequestMethod.POST)
	public Itens createNewItens(@RequestBody ItenReq requestItens) {
		System.out.println("Yo whwaa");
		return itenService.createIten(requestItens);
	}

}
