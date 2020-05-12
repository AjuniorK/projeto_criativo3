package com.sha.serverbookmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import com.sha.serverbookmanager.jwt.JwtTokenProvider;
import com.sha.serverbookmanager.model.Role;
import com.sha.serverbookmanager.model.User;
import com.sha.serverbookmanager.model.Transaction;
import com.sha.serverbookmanager.repository.BookRepository;
import com.sha.serverbookmanager.service.BookService;
import com.sha.serverbookmanager.service.TransactionService;
import com.sha.serverbookmanager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
            //logout will also use here so we should return ok http status.
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
