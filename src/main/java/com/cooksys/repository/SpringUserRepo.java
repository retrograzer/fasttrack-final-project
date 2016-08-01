package com.cooksys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.entity.User;

public interface SpringUserRepo extends JpaRepository<User, Long> {

	User findByUsername(String name);

}
