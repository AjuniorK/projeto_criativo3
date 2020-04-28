package com.sha.serverproductmanager.repository;

import com.sha.serverproductmanager.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
