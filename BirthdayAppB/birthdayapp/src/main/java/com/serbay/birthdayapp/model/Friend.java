package com.serbay.birthdayapp.model;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Comparator;
import java.util.Date;

public class Friend implements Comparable<Friend> {
    public int id;
    private String name;
    private String birthday;



    public Friend() {
    }

    public Friend(int id, String name, String birthday) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
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
        try {
            Date birthday = new SimpleDateFormat("dd.MM.yyyy").parse(this.birthday);
            Date birthday2 = new SimpleDateFormat("dd.MM.yyyy").parse(o.birthday);
            return birthday.compareTo(birthday2);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

    }
}
