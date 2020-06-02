package com.sha.serverproductmanager.repository;

import com.sha.serverproductmanager.model.Book;
import com.sha.serverproductmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    //find by username
    List<Book> findBookByUserId (String user_id);
}
