package com.pocketpay.transaction.controllers;

import com.pocketpay.transaction.dto.TransactionDto;
import com.pocketpay.transaction.exception.NotFoundException;
import com.pocketpay.transaction.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
    @GetMapping
    public ResponseEntity<List<TransactionDto>> findAllTransactions(){
        return new ResponseEntity<>(transactionService.getAllTransactions(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<TransactionDto> saveTransactions(@RequestBody TransactionDto transactionDto){
        return  new ResponseEntity<>(transactionService.saveTransaction(transactionDto),HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TransactionDto> updateTransaction(
            @PathVariable int id,
            @RequestBody TransactionDto transactionDto) {
        try {
            TransactionDto updatedTransaction = transactionService.updateTransaction(id, transactionDto);
            return new ResponseEntity<>(updatedTransaction, HttpStatus.OK);
        } catch (NotFoundException e) { // Replace NotFoundException with the actual exception class
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
