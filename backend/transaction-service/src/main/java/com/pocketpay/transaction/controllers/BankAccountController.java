package com.pocketpay.transaction.controllers;

import com.pocketpay.transaction.dto.BankAccountDto;
import com.pocketpay.transaction.service.BankAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bank-accounts")
public class BankAccountController {
    @Autowired
    public BankAccountService bankAccountService;

    @PostMapping
    public ResponseEntity<BankAccountDto> saveBankAccount(@RequestBody BankAccountDto bankAccountDto){
        return new ResponseEntity<>(bankAccountService.saveBankAccount(bankAccountDto), HttpStatus.CREATED);
    }
}
