package com.pocketpay.transaction.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pocketpay.transaction.controllers.TransactionController;
import com.pocketpay.transaction.dto.TransactionDto;
import com.pocketpay.transaction.enums.Status;
import com.pocketpay.transaction.enums.TransferType;
import com.pocketpay.transaction.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

class TransactionControllerTest {

    @InjectMocks
    private TransactionController transactionController;

    @Mock
    private TransactionService transactionService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testFindAllTransactions() throws Exception {
        // Create a list of sample TransactionDto objects
        List<TransactionDto> transactionList = new ArrayList<>();
        TransactionDto transaction1 = new TransactionDto();
        transaction1.setId(1);
        transaction1.setAmountSent(new BigDecimal("100.00"));
        transaction1.setPaymentPurpose("Payment for order");
        transaction1.setFromCurrency("USD");
        transaction1.setToCurrency("EUR");
        transaction1.setTransferRate(new BigDecimal("0.85"));
        transaction1.setTransferType(TransferType.BANK);
        transaction1.setStatus(Status.SENT);
        transactionList.add(transaction1);

        // Mock the transactionService's behavior
        when(transactionService.getAllTransactions()).thenReturn(transactionList);

        // Send a GET request to the controller
        ResponseEntity<List<TransactionDto>> responseEntity = transactionController.findAllTransactions();

        // Verify the response status
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verify the service method was called
        verify(transactionService, times(1)).getAllTransactions();

        // Verify the response content
        List<TransactionDto> responseTransactionList = responseEntity.getBody();
        assertNotNull(responseTransactionList);
        assertEquals(transactionList.size(), responseTransactionList.size());
        assertEquals(transaction1.getId(), responseTransactionList.get(0).getId());
        assertEquals(transaction1.getAmountSent(), responseTransactionList.get(0).getAmountSent());
        assertEquals(transaction1.getPaymentPurpose(), responseTransactionList.get(0).getPaymentPurpose());
        // Add assertions for other fields as needed
    }

    @Test
    void testSaveTransaction() throws Exception {
        // Create a sample TransactionDto
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setId(1);
        transactionDto.setAmountSent(new BigDecimal("100.00"));
        transactionDto.setPaymentPurpose("Payment for order");
        transactionDto.setFromCurrency("USD");
        transactionDto.setToCurrency("EUR");
        transactionDto.setTransferRate(new BigDecimal("0.85"));
        transactionDto.setTransferType(TransferType.BANK);
        transactionDto.setStatus(Status.SENT);

        // Mock the transactionService's behavior
        when(transactionService.saveTransaction(any(TransactionDto.class))).thenReturn(transactionDto);

        // Send a POST request to the controller
        ResponseEntity<TransactionDto> responseEntity = transactionController.saveTransactions(transactionDto);

        // Verify the response status
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());

        // Verify that the service method was called with the correct parameter
        verify(transactionService, times(1)).saveTransaction(any(TransactionDto.class));

        // Verify the response content
        TransactionDto responseTransactionDto = responseEntity.getBody();
        assertNotNull(responseTransactionDto);
        assertEquals(transactionDto.getId(), responseTransactionDto.getId());
        assertEquals(transactionDto.getAmountSent(), responseTransactionDto.getAmountSent());
        assertEquals(transactionDto.getPaymentPurpose(), responseTransactionDto.getPaymentPurpose());
        // Add assertions for other fields as needed
    }

    @Test
    void testUpdateTransaction() throws Exception {
        // Create a sample TransactionDto for update
        TransactionDto updatedTransactionDto = new TransactionDto();
        updatedTransactionDto.setId(1);
        updatedTransactionDto.setAmountSent(new BigDecimal("200.00"));
        updatedTransactionDto.setPaymentPurpose("Updated payment purpose");
        updatedTransactionDto.setFromCurrency("USD");
        updatedTransactionDto.setToCurrency("GBP");
        updatedTransactionDto.setTransferRate(new BigDecimal("0.75"));
        updatedTransactionDto.setTransferType(TransferType.BANK);
        updatedTransactionDto.setStatus(Status.SENDING);

        // Mock the transactionService's behavior for the update
        when(transactionService.updateTransaction(anyInt(), any(TransactionDto.class))).thenReturn(updatedTransactionDto);

        // Send a PATCH request to the controller
        ResponseEntity<TransactionDto> responseEntity = transactionController.updateTransaction(1, updatedTransactionDto);

        // Verify the response status
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verify that the service method was called with the correct parameters
        verify(transactionService, times(1)).updateTransaction(anyInt(), any(TransactionDto.class));

        // Verify the response content
        TransactionDto responseTransactionDto = responseEntity.getBody();
        assertNotNull(responseTransactionDto);
        assertEquals(updatedTransactionDto.getId(), responseTransactionDto.getId());
        assertEquals(updatedTransactionDto.getAmountSent(), responseTransactionDto.getAmountSent());
        assertEquals(updatedTransactionDto.getPaymentPurpose(), responseTransactionDto.getPaymentPurpose());
        // Add assertions for other fields as needed
    }

    @Test
    void testUpdateTransactionNotFound() throws Exception {
        // Mock the transactionService's behavior to return null, simulating a not found scenario
        when(transactionService.updateTransaction(anyInt(), any(TransactionDto.class))).thenReturn(null);

        // Send a PATCH request to the controller
        ResponseEntity<TransactionDto> responseEntity = transactionController.updateTransaction(1, new TransactionDto());

        // Verify the response status
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }
}

