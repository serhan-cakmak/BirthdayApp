package com.serbay.birthdayapp.service;

import com.serbay.birthdayapp.model.Friend;
import com.serbay.birthdayapp.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
    public int userValidator( String email , String password);
    public Optional<User> getUser();

    public int addFriend( Friend friend, int id);
    public List<Friend> getAllFriends(String id);
}
