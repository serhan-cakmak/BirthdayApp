package com.serbay.birthdayapp.service;

import com.serbay.birthdayapp.model.Friend;
import com.serbay.birthdayapp.model.User;
import com.serbay.birthdayapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class UserServiceImpl implements  UserService{
    @Autowired
    private UserRepository userRepository;


    @Override
    public String saveUser(User user) {
        if (userRepository.emailUnique(user.getEmail()) == null) {
            userRepository.save(user);
            return "true";
        }else{
            return "false";
        }

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
            LocalDate now = LocalDate.now();

            for (int i = 0; i < friendStrings.length; i++ ){
                String[] ob = friendStrings[i].split("/");
//                int year = Integer.parseInt( ob[1].split("-")[0]);
//                Date birthday = new SimpleDateFormat("MM-dd").parse(ob[1]);
                LocalDate acBirthday = LocalDate.parse(ob[1]);
                LocalDate birthday = LocalDate.parse(now.getYear() + ob[1].substring(4));
//                if (birthday.getTime() > now.getTime())
//                System.out.println( dateDiffInDays(birthday));
//                ob[1] = ob[1].substring(8) +"." + ob[1].substring(5,7) + "." + ob[1].substring(0,4);
                res.add( new Friend(i,ob[0], ob[1], dateDiffInDays(birthday,now), dateDiffInYears(now,acBirthday)+1));
            }
            Collections.sort(res);

            return res;
        }catch (Exception e){
            System.out.println(e);
            return null;
        }

    }

    @Override
    public int resetFriends(int id) {
        return userRepository.reset(id);
    }

    public int dateDiffInDays(LocalDate a, LocalDate b) {

//        int _MS_PER_DAY = 1000 * 60 * 60 * 24;
        if (a.compareTo(b)>=0 ){
            return (int) ChronoUnit.DAYS.between(b,a);
        }else{
            //considering elapsed years
            return (int) ChronoUnit.DAYS.between(b, a.plusYears(1));
        }

        }
    public int dateDiffInYears(LocalDate a, LocalDate b) { return (int) ChronoUnit.YEARS.between(b,a);}



    }
