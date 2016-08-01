package com.cooksys.service;

import java.util.List;

import com.cooksys.entity.User;
import com.cooksys.repository.UserReq;

public interface UserService {

	User createUser(UserReq requestUser);

	User login(UserReq requestUser);

	User getUserByUsername(String name);

	List<User> getAllUsers();

}
