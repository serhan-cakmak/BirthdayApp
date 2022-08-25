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
//    Optional<User> findByEmail(String email);

//    @Transactional
//    @Modifying
//    @Query("UPDATE user a " +
//            "SET a.enabled = TRUE WHERE a.email = ?1")
//    int enableAppUser(String email);
}
