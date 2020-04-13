package com.sha.serverproductmanager.repository;

import com.sha.serverproductmanager.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository <Transaction, Long> {

}
