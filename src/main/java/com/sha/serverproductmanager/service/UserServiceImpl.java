package com.sha.serverproductmanager.service;

import com.sha.serverproductmanager.model.User;
import com.sha.serverproductmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    //It will be provided on WebSecurityConfig as @Bean
    //@Autowired
    //private PasswordEncoder passwordEncoder;



    @Override
    public User saveUser(User user){
        //String encodedPassword = new BCryptPasswordEncoder().encode(user.getSenha());
        //user.setSenha(encodedPassword);
        return userRepository.save(user);

    }

    //save = create or update
    @Override
    public User updateUser(final User user){
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(final Long userId){
        userRepository.deleteById(userId);
    }

    @Override
    public User findByUsername(final String username){
        return userRepository.findByNome(username).orElse(null);
    }

    @Override
    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    @Override
    public Long numberOfUsers(){
        return userRepository.count();
    }
}
