package com.sha.serverproductmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import com.sha.serverproductmanager.jwt.JwtTokenProvider;
import com.sha.serverproductmanager.model.Role;
import com.sha.serverproductmanager.model.User;
import com.sha.serverproductmanager.model.Transaction;
import com.sha.serverproductmanager.repository.BookRepository;
import com.sha.serverproductmanager.service.BookService;
import com.sha.serverproductmanager.service.TransactionService;
import com.sha.serverproductmanager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;

@RestController
public class UserController {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private TransactionService transactionService;


    @PostMapping("api/user/registration")
    public ResponseEntity<?> register(@RequestBody User user){
        if (userService.findByUsername(user.getNome()) !=null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);

        }
        user.setRole(Role.USER);
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/api/user/login")
    public ResponseEntity<?> getUser(Principal principal){
        //principal = httpServletRequest.getUserPrincipal.
        if(principal == null){
            return ResponseEntity.ok(principal);
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) principal;
        User user = userService.findByUsername(authenticationToken.getName());
        user.setToken(tokenProvider.generateToken(authenticationToken));

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/api/user/trade")
    public ResponseEntity<?> tradeBook(@RequestBody Transaction transaction){
        transaction.setTradeDate(LocalDateTime.now());
        transactionService.saveTransaction(transaction);
        return new ResponseEntity<>(transaction, HttpStatus.CREATED);
    }

    @GetMapping("/api/user/book")
    public ResponseEntity<?> getAllBooks(){
        return new ResponseEntity<>(bookService.findAllBooks(), HttpStatus.OK);
    }



}
