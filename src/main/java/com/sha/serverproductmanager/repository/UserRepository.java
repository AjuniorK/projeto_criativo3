package com.sha.serverproductmanager.repository;

import com.sha.serverproductmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.net.UnknownServiceException;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    //find by username
    Optional<User> findByNome (String username);

}
