package com.cooksys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.entity.Itens;

public interface SpringItenRepo extends JpaRepository<Itens, Long>{

}
