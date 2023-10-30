package com.pocketpay.transaction.services;

import com.pocketpay.transaction.dto.TransactionDto;
import com.pocketpay.transaction.entity.Transaction;
import com.pocketpay.transaction.exception.InternalServerException;
import com.pocketpay.transaction.exception.NotFoundException;
import com.pocketpay.transaction.exception.PostException;
import com.pocketpay.transaction.exception.TransactionException;
import com.pocketpay.transaction.repository.TransactionRepository;
import com.pocketpay.transaction.service.TransactionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class TransactionServiceImplTest {

    @InjectMocks
    private TransactionServiceImpl transactionService;

    @Mock
    private TransactionRepository transactionRepository;

    private ModelMapper modelMapper = new ModelMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllTransactions() {
        // Create a list of sample Transaction entities
        List<Transaction> transactionEntities = new ArrayList<>();
        transactionEntities.add(new Transaction());
        transactionEntities.add(new Transaction());

        // Mock the transactionRepository's behavior to return the list of entities
        when(transactionRepository.findAll()).thenReturn(transactionEntities);

        // Call the service method
        List<TransactionDto> transactionDtos = transactionService.getAllTransactions();

        // Verify that the repository's findAll method was called
        verify(transactionRepository, times(1)).findAll();

        // Verify that the returned list is not empty and contains the same number of elements as the entities
        assertNotNull(transactionDtos);
        assertEquals(transactionEntities.size(), transactionDtos.size());
    }

    @Test
    void testSaveTransaction() {
        // Create a sample TransactionDto
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setId(1);

        // Create a corresponding Transaction entity
        Transaction transactionEntity = modelMapper.map(transactionDto, Transaction.class);

        // Mock the transactionRepository's behavior to return the entity when saved
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transactionEntity);

        // Call the service method
        TransactionDto savedTransactionDto = transactionService.saveTransaction(transactionDto);

        // Verify that the repository's save method was called with the expected parameter
        verify(transactionRepository, times(1)).save(any(Transaction.class));

        // Verify that the returned DTO matches the input DTO
        assertNotNull(savedTransactionDto);
        assertEquals(transactionDto.getId(), savedTransactionDto.getId());
    }

    @Test
    void testSaveTransactionWithException() {
        // Create a sample TransactionDto
        TransactionDto transactionDto = new TransactionDto();

        // Mock the transactionRepository's behavior to throw an exception when saving
        when(transactionRepository.save(any(Transaction.class))).thenThrow(new RuntimeException("Simulated error"));

        // Call the service method and expect a PostException to be thrown
        assertThrows(PostException.class, () -> transactionService.saveTransaction(transactionDto));

        // Verify that the repository's save method was called
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    @Test
    void testUpdateTransaction() {
        // Create a sample TransactionDto
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setId(1);
        transactionDto.setAmountSent(BigDecimal.valueOf(100.0));

        // Create a corresponding Transaction entity
        Transaction transactionEntity = modelMapper.map(transactionDto, Transaction.class);

        // Mock the transactionRepository's behavior to return the entity when updated
        when(transactionRepository.findById(1)).thenReturn(Optional.of(transactionEntity));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transactionEntity);

        // Call the service method
        TransactionDto updatedTransactionDto = transactionService.updateTransaction(1, transactionDto);

        // Verify that the repository's findById and save methods were called with the expected parameters
        verify(transactionRepository, times(1)).findById(1);
        verify(transactionRepository, times(1)).save(any(Transaction.class));

        // Verify that the returned DTO matches the input DTO
        assertNotNull(updatedTransactionDto);
        assertEquals(transactionDto.getId(), updatedTransactionDto.getId());
        assertEquals(transactionDto.getAmountSent(), updatedTransactionDto.getAmountSent());
    }

    @Test
    void testUpdateTransactionNotFound() {
        // Mock the transactionRepository's behavior to return an empty Optional when findById is called
        when(transactionRepository.findById(1)).thenReturn(Optional.empty());

        // Create a sample TransactionDto
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setId(1);

        // Call the service method and expect a NotFoundException to be thrown
        assertThrows(NotFoundException.class, () -> transactionService.updateTransaction(1, transactionDto));

        // Verify that the repository's findById method was called
        verify(transactionRepository, times(1)).findById(1);
    }

    @Test
    void testUpdateTransactionWithException() {
        // Create a sample TransactionDto
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setId(1);

        // Mock the transactionRepository's behavior to throw an exception when saving
        when(transactionRepository.findById(1)).thenReturn(Optional.of(new Transaction()));
        when(transactionRepository.save(any(Transaction.class))).thenThrow(new RuntimeException("Simulated error"));

        // Call the service method and expect a TransactionException to be thrown
        assertThrows(TransactionException.class, () -> transactionService.updateTransaction(1, transactionDto));

        // Verify that the repository's findById and save methods were called
        verify(transactionRepository, times(1)).findById(1);
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }
}

