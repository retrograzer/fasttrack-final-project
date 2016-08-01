package com.cooksys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.entity.Itens;
import com.cooksys.repository.ItenReq;
import com.cooksys.repository.SpringItenRepo;
import com.cooksys.service.ItenService;

@Service
public class ItenServiceImpl implements ItenService {
	
	@Autowired
	SpringItenRepo repo;

	@Override
	public List<Itens> getAllItens() {
		return repo.findAll();
	}
	
	@Override
	public Itens createIten(ItenReq requestIten) {
		Itens flight = new Itens();
		flight.setName(requestIten.getName());
		flight.setOrigin(requestIten.getOrigin());
		flight.setDestination(requestIten.getDestination());
		flight.setMidpoint(requestIten.getMidpoint());
		repo.save(flight);
		return flight;
	}

}
