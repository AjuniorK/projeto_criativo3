package com.sha.serverproductmanager.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="Titulo")
    private String name;

    @Column(name="ISBN")
    private String author;

    @Column(name="Edicao")
    private int description;

    @Column(name="Copyright")
    private String publishingCompany;

}