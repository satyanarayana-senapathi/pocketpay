package com.pocketpay.transaction.services;

import com.pocketpay.transaction.dto.DebitCardDto;
import com.pocketpay.transaction.entity.DebitCard;
import com.pocketpay.transaction.exception.TransactionException;
import com.pocketpay.transaction.repository.DebitCardRepository;
import com.pocketpay.transaction.service.DebitCardServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

public class DebitCardServiceImplTest {

    @InjectMocks
    private DebitCardServiceImpl debitCardService;

    @Mock
    private DebitCardRepository debitCardRepository;

    private ModelMapper modelMapper = new ModelMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testUpdateDebitCard() {
        // Create a sample DebitCardDto for update
        DebitCardDto updatedDebitCardDto = new DebitCardDto();
        updatedDebitCardDto.setId(1);
        updatedDebitCardDto.setCvv(123);
        updatedDebitCardDto.setExpiryDate(LocalDate.of(2025, 12, 31));

        // Create a corresponding DebitCard entity
        DebitCard debitCardEntity = modelMapper.map(updatedDebitCardDto, DebitCard.class);

        // Mock the debitCardRepository's behavior
        when(debitCardRepository.findById(anyInt())).thenReturn(Optional.of(debitCardEntity));
        when(debitCardRepository.save(any(DebitCard.class))).thenReturn(debitCardEntity);

        // Call the service method
        DebitCardDto updatedDebitCardResponseDto = debitCardService.updateDebitCard(1, updatedDebitCardDto);

        // Verify that the repository's findById method was called with the expected parameter
        verify(debitCardRepository, times(1)).findById(1);

        // Verify that the repository's save method was called with the expected parameter
        verify(debitCardRepository, times(1)).save(any(DebitCard.class));

        // Verify that the returned DTO matches the input DTO
        assertNotNull(updatedDebitCardResponseDto);
        assertEquals(updatedDebitCardDto.getId(), updatedDebitCardResponseDto.getId());
        assertEquals(updatedDebitCardDto.getCvv(), updatedDebitCardResponseDto.getCvv());
        assertEquals(updatedDebitCardDto.getExpiryDate(), updatedDebitCardResponseDto.getExpiryDate());
    }


    @Test
    void testUpdateDebitCardWithError() {
        // Create a sample DebitCardDto for update
        DebitCardDto updatedDebitCardDto = new DebitCardDto();

        // Create a corresponding DebitCard entity
        DebitCard debitCardEntity = modelMapper.map(updatedDebitCardDto, DebitCard.class);

        // Mock the debitCardRepository's behavior to throw an exception when saving
        when(debitCardRepository.findById(anyInt())).thenReturn(Optional.of(debitCardEntity));
        when(debitCardRepository.save(any(DebitCard.class))).thenThrow(new RuntimeException("Simulated error"));

        // Call the service method and expect an exception to be thrown
        assertThrows(TransactionException.class, () -> debitCardService.updateDebitCard(1, updatedDebitCardDto));

        // Verify that the repository's findById method was called
        verify(debitCardRepository, times(1)).findById(1);

        // Verify that the repository's save method was called
        verify(debitCardRepository, times(1)).save(any(DebitCard.class));
    }
}

