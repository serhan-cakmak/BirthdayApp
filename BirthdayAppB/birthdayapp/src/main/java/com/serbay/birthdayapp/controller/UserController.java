package com.serbay.birthdayapp.controller;

import com.serbay.birthdayapp.model.User;
import com.serbay.birthdayapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String add(@RequestBody User user){
        userService.saveUser(user);
        return "New user is added";
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

//    @PostMapping("/login")
//    public int enableAppUser(@RequestBody User user){
//        return userService.enableAppUser(user.getEmail());
//
//    }


}
