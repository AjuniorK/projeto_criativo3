package com.sha.serverbookmanager.repository;

import com.sha.serverbookmanager.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
