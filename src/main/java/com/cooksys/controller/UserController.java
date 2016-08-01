package com.cooksys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.entity.User;
import com.cooksys.repository.UserReq;
import com.cooksys.service.UserService;

@RestController
@RequestMapping("user")
public class UserController {

	@Autowired
	UserService userService;
	
	@RequestMapping(value="create",method=RequestMethod.POST)
	public User createUser(@RequestBody UserReq requestUser) {
		return userService.createUser(requestUser);
	}
	
	@RequestMapping(value="get", method=RequestMethod.GET)
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}
	
	@RequestMapping(value="login", method=RequestMethod.POST)
	public User userLogin(@RequestBody UserReq requestUser) {
		return userService.login(requestUser);
	}
	
}
