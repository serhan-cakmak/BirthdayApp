package com.serbay.birthdayapp.model;

import javax.persistence.*;
import java.util.ArrayList;

import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String email;
    private String password;
    private boolean isEnabled;
    @Column(name="friends")
    private String friends ="";

//    public String getFriends() {

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFriends() {
        return friends;
    }

    public void setFriends(String friends) {
        this.friends = friends;
    }
//        return friends;
//    }
//
//    public void setFriends(String friends) {
//        this.friends = friends;
//    }

    public User() {
    }
//
//    public void addFriendsBirthday(Friend friend){
//        friends.add(friend);
//    }
//
//    public ArrayList<Friend> getFriends() {
//        return friends;
//    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
