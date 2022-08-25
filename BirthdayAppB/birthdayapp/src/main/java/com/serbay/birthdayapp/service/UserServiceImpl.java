package com.serbay.birthdayapp.service;

import com.serbay.birthdayapp.model.User;
import com.serbay.birthdayapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements  UserService{
    @Autowired
    private UserRepository userRepository;


    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

//    @Override
//    public int enableAppUser(String email) {
//        return userRepository.enableAppUser(email);
//    }


}
