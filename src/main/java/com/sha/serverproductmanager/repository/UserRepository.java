package com.sha.serverproductmanager.repository;

import com.sha.serverproductmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.net.UnknownServiceException;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    //find by username
    Optional<User> findByUsername (String username);

}
