package com.pocketpay.transaction.service;

import com.pocketpay.transaction.dto.BankAccountDto;

public interface BankAccountService {
    BankAccountDto saveBankAccount(BankAccountDto bankAccountDto);
}
