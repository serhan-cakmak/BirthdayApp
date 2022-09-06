package com.serbay.birthdayapp.service;

import com.serbay.birthdayapp.model.Friend;
import com.serbay.birthdayapp.model.User;
import com.serbay.birthdayapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

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

    @Override
    public int userValidator(String email, String password) {
        return userRepository.userValidator(email,password);
    }

    @Override
    public Optional<User> getUser() {
        return userRepository.getUser();
    }

    @Override
    public int addFriend(Friend friend, int id) {
        return userRepository.addFriend(friend.getName(), friend.getBirthday(), id);
    }

    @Override
    public List<Friend> getAllFriends(String id) {
        try {
            userRepository.disenable();
            String[] friendStrings = userRepository.getAllFriends(id).split("\0");
            List<Friend> res = new ArrayList<>();
            for (int i = 0; i < friendStrings.length; i++ ){
                String[] ob = friendStrings[i].split("/");
                ob[1] = ob[1].substring(8) +"." + ob[1].substring(5,7) + "." + ob[1].substring(0,4);
                res.add( new Friend(i,ob[0], ob[1]));
            }
            Collections.sort(res);
            return res;
        }catch (Exception e){
            return null;
        }

    }


}
