package com.pocketpay.transaction.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pocketpay.transaction.controllers.BankAccountController;
import com.pocketpay.transaction.dto.BankAccountDto;
import com.pocketpay.transaction.enums.AccountType;
import com.pocketpay.transaction.service.BankAccountService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static java.lang.Integer.parseInt;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

public class BankAccountControllerTest {

    @InjectMocks
    private BankAccountController bankAccountController;

    @Mock
    private BankAccountService bankAccountService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testSaveBankAccount() throws Exception {
        // Create a sample BankAccountDto
        BankAccountDto bankAccountDto = new BankAccountDto();
        bankAccountDto.setAccountNumber(1234567890);
        bankAccountDto.setBankName("Example Bank");
        bankAccountDto.setBankAddress("123 Main St, City");
        bankAccountDto.setIfsc("ABCD12345");
        bankAccountDto.setAccountType(AccountType.Saving);

        // Mock the bankAccountService's behavior
        when(bankAccountService.saveBankAccount(any(BankAccountDto.class))).thenReturn(bankAccountDto);

        // Send a POST request to the controller
        ResponseEntity<BankAccountDto> responseEntity = bankAccountController.saveBankAccount(bankAccountDto);

        // Verify the response status
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());

        // Verify that the service method was called with the correct parameter
        verify(bankAccountService, times(1)).saveBankAccount(any(BankAccountDto.class));

        // Convert the response JSON to BankAccountDto and verify its content
        String responseBody = objectMapper.writeValueAsString(responseEntity.getBody());
        BankAccountDto responseBankAccountDto = objectMapper.readValue(responseBody, BankAccountDto.class);

        assertEquals(bankAccountDto.getAccountNumber(), responseBankAccountDto.getAccountNumber());
        assertEquals(bankAccountDto.getBankName(), responseBankAccountDto.getBankName());
        assertEquals(bankAccountDto.getBankAddress(), responseBankAccountDto.getBankAddress());
        assertEquals(bankAccountDto.getIfsc(), responseBankAccountDto.getIfsc());
        assertEquals(bankAccountDto.getAccountType(), responseBankAccountDto.getAccountType());
    }
}
