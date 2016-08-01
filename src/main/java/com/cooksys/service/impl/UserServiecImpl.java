package com.cooksys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.entity.User;
import com.cooksys.repository.SpringUserRepo;
import com.cooksys.repository.UserReq;
import com.cooksys.service.UserService;

@Service
public class UserServiecImpl implements UserService {
	
	@Autowired
	SpringUserRepo userRepo;

	@Override
	public User createUser(UserReq requestUser) {
		User user = checkExisting(requestUser);
		if (user != null) {
			userRepo.save(user);
		}
		return user;
	}
	
	@Override
	public User getUserByUsername(String name) {
		return userRepo.findByUsername(name);
	}
	
	@Override
	public User login(UserReq requestUser) {
		User onFile = getUserByUsername(requestUser.getUsername());
		User toLogin = new User();
		toLogin.setUsername(requestUser.getUsername());
		toLogin.setPassword(requestUser.getPassword());
		
		if (verifyUser(toLogin, onFile)) {
			return onFile;
		}
		
		{
			 throw new IllegalArgumentException("The name or the password is wrong.Try logging in again");
		}
	}
	
	private User checkExisting(UserReq requestUser) {
		User existing = getUserByUsername(requestUser.getUsername());
		
		if (existing == null) {
			User user = new User();
			user.setUsername(requestUser.getUsername());
			user.setPassword(requestUser.getPassword());
			return user;
		}
		{
			 throw new IllegalArgumentException("The 'name' already exists");
		}
	}
	
	private boolean verifyUser(User toLogin, User onFile) {
		if (toLogin == null || onFile == null)
			return false;
		return (toLogin.getUsername().equals(onFile.getUsername()) && toLogin.getPassword().equals(onFile.getPassword()));
	}

	@Override
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

}
