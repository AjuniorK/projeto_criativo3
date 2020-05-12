package com.sha.serverbookmanager.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nome")
    private String nome;

    @Column(name="login")
    private String login;

    @Column(name="senha")
    private String senha;

    @Column(name="profissao")
    private String profissao;

    @Column(name="escola")
    private String escola;

    @Enumerated(EnumType.STRING)
    @Column(name="role")
    private Role role;

    //Not persistent. There is no column on database table.
    @Transient
    private String token;
}