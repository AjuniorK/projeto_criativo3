package com.sha.serverbookmanager.service;

import com.sha.serverbookmanager.model.Book;

import java.util.List;

public interface BookService {
    Book saveBook(Book book);

    Book updateBook(Book book);

    void deleteBook(Long bookId);

    Long numberOfBooks();

    List<Book> findAllBooks();
}
