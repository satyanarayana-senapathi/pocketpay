package com.pocketpay.transaction.services;

import com.pocketpay.transaction.dto.BankAccountDto;
import com.pocketpay.transaction.enums.AccountType;
import com.pocketpay.transaction.entity.BankAccount;
import com.pocketpay.transaction.exception.PostException;
import com.pocketpay.transaction.repository.BankAccountRepository;
import com.pocketpay.transaction.service.BankMethodServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

public class BankMethodServiceImplTest {

    @InjectMocks
    private BankMethodServiceImpl bankMethodService;

    @Mock
    private BankAccountRepository bankAccountRepository;

    private ModelMapper modelMapper = new ModelMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testSaveBankAccount() {

        // Create a sample BankAccountDto
        BankAccountDto bankAccountDto = new BankAccountDto();
        bankAccountDto.setAccountNumber(1234567890);
        bankAccountDto.setBankName("Sample Bank");
        bankAccountDto.setBankAddress("123 Main St");
        bankAccountDto.setIfsc("ABC123");
        bankAccountDto.setAccountType(AccountType.Saving);

        // Create a corresponding BankAccount entity
        BankAccount bankAccountEntity = modelMapper.map(bankAccountDto, BankAccount.class);

        // Mock the bankAccountRepository's behavior
        when(bankAccountRepository.save(any(BankAccount.class))).thenReturn(bankAccountEntity);

        // Call the service method
        BankAccountDto savedBankAccountDto = bankMethodService.saveBankAccount(bankAccountDto);

        // Verify that the repository's save method was called with the expected parameter
        verify(bankAccountRepository, times(1)).save(any(BankAccount.class));

        // Verify that the returned DTO matches the input DTO
        assertNotNull(savedBankAccountDto);
        assertEquals(bankAccountDto.getAccountNumber(), savedBankAccountDto.getAccountNumber());
        assertEquals(bankAccountDto.getBankName(), savedBankAccountDto.getBankName());
        assertEquals(bankAccountDto.getBankAddress(), savedBankAccountDto.getBankAddress());
        assertEquals(bankAccountDto.getIfsc(), savedBankAccountDto.getIfsc());
        assertEquals(bankAccountDto.getAccountType(), savedBankAccountDto.getAccountType());
    }

    @Test
    void testSaveBankAccountWithError() {
        // Create a sample BankAccountDto
        BankAccountDto bankAccountDto = new BankAccountDto();

        // Mock the bankAccountRepository's behavior to throw an exception when saving
        when(bankAccountRepository.save(any(BankAccount.class))).thenThrow(new RuntimeException("Simulated error"));

        // Call the service method and expect an exception to be thrown
        assertThrows(PostException.class, () -> bankMethodService.saveBankAccount(bankAccountDto));

        // Verify that the repository's save method was called
        verify(bankAccountRepository, times(1)).save(any(BankAccount.class));
    }
}

