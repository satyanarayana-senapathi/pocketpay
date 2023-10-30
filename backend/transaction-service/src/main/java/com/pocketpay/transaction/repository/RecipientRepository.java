package com.pocketpay.transaction.repository;

import com.pocketpay.transaction.entity.Recipient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipientRepository extends JpaRepository<Recipient,Integer> {
}
