package com.sha.serverproductmanager.service;

import com.sha.serverproductmanager.model.Book;

import java.util.List;

public interface BookService {
    Book saveBook(Book book);

    Book updateBook(Book book);

    void deleteBook(Long bookId);

    Long numberOfBooks();

    List<Book> findAllBooks();
}
