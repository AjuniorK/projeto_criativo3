package com.sha.serverbookmanager.repository;

import com.sha.serverbookmanager.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository <Transaction, Long> {

}
