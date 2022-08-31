package com.serbay.birthdayapp.repository;

import com.serbay.birthdayapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Integer >{

    @Modifying
    @Transactional
    @Query(value = "update birthday.user u set u.is_enabled =true where u.email = ?1 and u.password = ?2 ", nativeQuery = true)
    int userValidator(String email, String password);

    @Transactional
    @Query(value = "select * from birthday.user u where u.is_enabled = true", nativeQuery = true)
    Optional<User> getUser();


}
