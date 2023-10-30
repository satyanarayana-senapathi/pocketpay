package com.pocketpay.transaction.services;

import com.pocketpay.transaction.dto.PaymentMethodDto;
import com.pocketpay.transaction.entity.PaymentMethod;
import com.pocketpay.transaction.exception.PostException;
import com.pocketpay.transaction.exception.TransactionFailure;
import com.pocketpay.transaction.repository.PaymentMethodRepository;
import com.pocketpay.transaction.service.PaymentMethodServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class PaymentMethodServiceImplTest {

    @InjectMocks
    private PaymentMethodServiceImpl paymentMethodService;

    @Mock
    private PaymentMethodRepository paymentMethodRepository;

    private ModelMapper modelMapper = new ModelMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllPayments() {
        // Create a list of sample PaymentMethod entities
        List<PaymentMethod> paymentMethodEntities = new ArrayList<>();
        paymentMethodEntities.add(new PaymentMethod());
        paymentMethodEntities.add(new PaymentMethod());

        // Mock the paymentMethodRepository's behavior to return the list of entities
        when(paymentMethodRepository.findAll()).thenReturn(paymentMethodEntities);

        // Call the service method
        List<PaymentMethodDto> paymentMethodDtos = paymentMethodService.getAllPayments();

        // Verify that the repository's findAll method was called
        verify(paymentMethodRepository, times(1)).findAll();

        // Verify that the returned list is not empty and contains the same number of elements as the entities
        assertNotNull(paymentMethodDtos);
        assertEquals(paymentMethodEntities.size(), paymentMethodDtos.size());
    }

    @Test
    void testGetAllPaymentsWhenRepositoryThrowsException() {
        // Arrange
        when(paymentMethodRepository.findAll()).thenThrow(new RuntimeException("Test Exception"));

        // Act & Assert
        assertThrows(TransactionFailure.class, () -> {
            paymentMethodService.getAllPayments();
        });
    }

    @Test
    void testSavePaymentMethod() {
        // Create a sample PaymentMethodDto
        PaymentMethodDto paymentMethodDto = new PaymentMethodDto();
        paymentMethodDto.setId(1);

        // Create a corresponding PaymentMethod entity
        PaymentMethod paymentMethodEntity = modelMapper.map(paymentMethodDto, PaymentMethod.class);

        // Mock the paymentMethodRepository's behavior to return the entity when saved
        when(paymentMethodRepository.save(any(PaymentMethod.class))).thenReturn(paymentMethodEntity);

        // Call the service method
        PaymentMethodDto savedPaymentMethodDto = paymentMethodService.savePaymentMethod(paymentMethodDto);

        // Verify that the repository's save method was called with the expected parameter
        verify(paymentMethodRepository, times(1)).save(any(PaymentMethod.class));

        // Verify that the returned DTO matches the input DTO
        assertNotNull(savedPaymentMethodDto);
        assertEquals(paymentMethodDto.getId(), savedPaymentMethodDto.getId());
    }

    @Test
    void testSavePaymentMethodWithException() {
        // Create a sample PaymentMethodDto
        PaymentMethodDto paymentMethodDto = new PaymentMethodDto();

        // Mock the paymentMethodRepository's behavior to throw an exception when saving
        when(paymentMethodRepository.save(any(PaymentMethod.class))).thenThrow(new RuntimeException("Simulated error"));

        // Call the service method and expect a PostException to be thrown
        assertThrows(PostException.class, () -> paymentMethodService.savePaymentMethod(paymentMethodDto));

        // Verify that the repository's save method was called
        verify(paymentMethodRepository, times(1)).save(any(PaymentMethod.class));
    }
}

