package com.sha.serverbookmanager.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="author")
    private String author;

    @Column(name="description")
    private String description;

    @Column(name="publishingCompany")
    private String publishingCompany;

    @Column(name="grade")
    private String grade;
}