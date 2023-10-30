package com.pocketpay.transaction.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pocketpay.transaction.controllers.DebitCardController;
import com.pocketpay.transaction.dto.DebitCardDto;
import com.pocketpay.transaction.dto.BankAccountDto;
import com.pocketpay.transaction.service.DebitCardService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

public class DebitCardControllerTest {

    @InjectMocks
    private DebitCardController debitCardController;

    @Mock
    private DebitCardService debitCardService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testUpdateDebitCard() {
        // Create a sample DebitCardDto
        DebitCardDto debitCardDto = new DebitCardDto();
        debitCardDto.setId(1);
        debitCardDto.setCvv(123);
        debitCardDto.setExpiryDate(LocalDate.of(2025, 12, 31));

        BankAccountDto bankAccountDto = new BankAccountDto();
        bankAccountDto.setAccountNumber(1234567890);
        debitCardDto.setBankAccountDto(bankAccountDto);

        // Mock the debitCardService's behavior
        when(debitCardService.updateDebitCard(anyInt(), any(DebitCardDto.class))).thenReturn(debitCardDto);

        // Send a PATCH request to the controller
        ResponseEntity<DebitCardDto> responseEntity = debitCardController.updateDebitCard(1, debitCardDto);

        // Verify the response status
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verify that the service method was called with the correct parameters
        verify(debitCardService, times(1)).updateDebitCard(anyInt(), any(DebitCardDto.class));

        // Verify the response content
        DebitCardDto responseDebitCardDto = responseEntity.getBody();
        assertNotNull(responseDebitCardDto);
        assertEquals(debitCardDto.getId(), responseDebitCardDto.getId());
        assertEquals(debitCardDto.getCvv(), responseDebitCardDto.getCvv());
        assertEquals(debitCardDto.getExpiryDate(), responseDebitCardDto.getExpiryDate());

        // Verify BankAccountDto within DebitCardDto
        assertEquals(debitCardDto.getBankAccountDto().getAccountNumber(), responseDebitCardDto.getBankAccountDto().getAccountNumber());
    }

    @Test
    void testUpdateDebitCardNotFound() throws Exception {
        // Mock the debitCardService's behavior to return null, simulating a not found scenario
        when(debitCardService.updateDebitCard(anyInt(), any(DebitCardDto.class))).thenReturn(null);

        // Send a PATCH request to the controller
        ResponseEntity<DebitCardDto> responseEntity = debitCardController.updateDebitCard(1, new DebitCardDto());

        // Verify the response status
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }
}
