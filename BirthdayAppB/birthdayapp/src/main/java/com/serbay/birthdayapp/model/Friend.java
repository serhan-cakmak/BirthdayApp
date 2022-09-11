package com.serbay.birthdayapp.model;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import java.time.LocalDate;

public class Friend implements Comparable<Friend> {
    public int id;
    private String name;
    private String birthday;
    private  int age;

    public Friend(int id, String name, String birthday, int remainingDays, int age) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
        this.remainingDays = remainingDays;
        this.age = age;

    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public  int remainingDays;

    public int getRemainingDays() {
        return remainingDays;
    }

    public void setRemainingDays(int remainingDays) {
        this.remainingDays = remainingDays;
    }

    public Friend() {
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    @Override
    public int compareTo(Friend o) {
        return this.remainingDays - o.getRemainingDays();
//        try {
//            Date birthday = new SimpleDateFormat("dd.MM.yyyy").parse(this.birthday);
//            Date birthday2 = new SimpleDateFormat("dd.MM.yyyy").parse(o.birthday);
//            Date now = new SimpleDateFormat("yyyy-MM-dd").parse(LocalDate.now().toString());
//            System.out.println( (now.getTime() - birthday.getTime())/ (1000 * 60 * 60 * 24));
//            return birthday.compareTo(o.birthday);
//
//        } catch (Exception e) {
//            System.out.println(e);
//            throw new RuntimeException(e);
//        }

    }
}
