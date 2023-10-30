package com.pocketpay.transaction.repository;

import com.pocketpay.transaction.entity.DebitCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DebitCardRepository extends JpaRepository<DebitCard, Integer> {
}
