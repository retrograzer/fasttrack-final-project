package com.cooksys.service;

import java.util.List;

import com.cooksys.entity.Itens;
import com.cooksys.repository.ItenReq;

public interface ItenService {

	List<Itens> getAllItens();

	Itens createIten(ItenReq requestIten);

}
