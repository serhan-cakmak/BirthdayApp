package com.serbay.birthdayapp.service;

import com.serbay.birthdayapp.model.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
//
//    public int enableAppUser(String email);
}
