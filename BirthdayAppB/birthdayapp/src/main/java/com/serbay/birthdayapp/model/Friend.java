package com.serbay.birthdayapp.model;

import java.util.Date;

public class Friend {
    private String name;
    private Date birthday;

    public Friend() {
    }

    public Friend(String name, Date birthday) {
        this.name = name;
        this.birthday = birthday;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }
}
