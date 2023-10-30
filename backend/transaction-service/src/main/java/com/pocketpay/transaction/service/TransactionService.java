package com.pocketpay.transaction.service;

import com.pocketpay.transaction.dto.TransactionDto;

import java.util.List;

public interface TransactionService {
    List<TransactionDto> getAllTransactions();
    TransactionDto saveTransaction(TransactionDto transactionDto );

    TransactionDto updateTransaction(int id, TransactionDto transactionDto);
}
