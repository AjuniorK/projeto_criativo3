package com.sha.serverproductmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import com.sha.serverproductmanager.model.Role;
import com.sha.serverproductmanager.model.User;
import com.sha.serverproductmanager.model.Transaction;
import com.sha.serverproductmanager.service.BookService;
import com.sha.serverproductmanager.service.TransactionService;
import com.sha.serverproductmanager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "")
@RestController
public class UserController {


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

    @PostMapping("api/user/logout")
    public void logout(@RequestBody User user){
        //return new ResponseEntity<>("logout user", HttpStatus.OK);
    }

    //@PostMapping("/api/user/login")
    @RequestMapping(value = "/api/user/login")
    public ResponseEntity<?> getUser(@RequestParam("login") String login){
        //principal = httpServletRequest.getUserPrincipal.
//        if(principal == null){
//            return ResponseEntity.ok(principal);
//        }
//        UsernamePasswordAuthenticationToken authenticationToken =
//                (UsernamePasswordAuthenticationToken) principal;
        User user_response = userService.findByUsername(login);
        //user.setToken(tokenProvider.generateToken(authenticationToken));

        return new ResponseEntity<>(user_response, HttpStatus.OK);
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

    @GetMapping("/api/user/bookUser")
    public ResponseEntity<?> getAllBooksUser(){
        return new ResponseEntity<>(bookService.findAllBooks(), HttpStatus.OK);
    }



}
