package com.sha.serverproductmanager.service;

import com.sha.serverproductmanager.model.Book;
import com.sha.serverproductmanager.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book saveBook(final Book book){
        bookRepository.save(book);
        return book;
    }

    @Override
    public Book updateBook(final Book book){
        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(final Long bookId){
        bookRepository.deleteById(bookId);
    }

    @Override
    public Long numberOfBooks(){
        return bookRepository.count();
    }

    @Override
    public List<Book> findAllBooks(){
        return bookRepository.findAll();
    }
}


