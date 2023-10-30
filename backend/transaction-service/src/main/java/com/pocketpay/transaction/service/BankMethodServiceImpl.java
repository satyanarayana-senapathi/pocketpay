package com.pocketpay.transaction.service;

import com.pocketpay.transaction.dto.BankAccountDto;
import com.pocketpay.transaction.entity.BankAccount;
import com.pocketpay.transaction.exception.PostException;
import com.pocketpay.transaction.repository.BankAccountRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BankMethodServiceImpl implements BankAccountService {

    @Autowired
    private BankAccountRepository bankAccountRepository;
    private ModelMapper modelMapper;
    public BankMethodServiceImpl(){modelMapper = new ModelMapper();}

    @Override
    public BankAccountDto saveBankAccount(BankAccountDto bankAccountDto) {
        try {
            BankAccount bankAccount = modelMapper.map(bankAccountDto, BankAccount.class);
            BankAccount savedBankAccount = bankAccountRepository.save(bankAccount);
            return modelMapper.map(savedBankAccount, BankAccountDto.class);
        } catch (Exception ex) {
            throw new PostException("Error occurred while saving bank account", ex);
        }
    }
}
