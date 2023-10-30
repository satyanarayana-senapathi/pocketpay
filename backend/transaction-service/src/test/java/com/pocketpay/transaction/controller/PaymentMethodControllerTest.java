package com.pocketpay.transaction.controller;

import com.pocketpay.transaction.controllers.PaymentMethodController;
import com.pocketpay.transaction.dto.BankAccountDto;
import com.pocketpay.transaction.dto.DebitCardDto;
import com.pocketpay.transaction.dto.PaymentMethodDto;
import com.pocketpay.transaction.enums.PayMethodMode;
import com.pocketpay.transaction.service.PaymentMethodService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

class PaymentMethodControllerTest {

    @InjectMocks
    private PaymentMethodController paymentMethodController;

    @Mock
    private PaymentMethodService paymentMethodService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testFindAllPaymentMethods() throws Exception {
        // Create a list of sample PaymentMethodDto objects
        List<PaymentMethodDto> paymentMethodList = new ArrayList<>();
        PaymentMethodDto paymentMethod1 = new PaymentMethodDto();
        paymentMethod1.setId(1);
        paymentMethod1.setUserId(101);
        paymentMethod1.setPayMethodMode(PayMethodMode.DEBIT);
        paymentMethod1.setBankAccountDto(new BankAccountDto());
        paymentMethod1.setDebitCardDto(new DebitCardDto());
        paymentMethodList.add(paymentMethod1);

        // Mock the paymentMethodService's behavior
        when(paymentMethodService.getAllPayments()).thenReturn(paymentMethodList);

        // Send a GET request to the controller
        ResponseEntity<List<PaymentMethodDto>> responseEntity = paymentMethodController.findAllPaymentMethods();

        // Verify the response status
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verify the service method was called
        verify(paymentMethodService, times(1)).getAllPayments();

        // Verify the response content
        List<PaymentMethodDto> responsePaymentMethodList = responseEntity.getBody();
        assertNotNull(responsePaymentMethodList);
        assertEquals(paymentMethodList.size(), responsePaymentMethodList.size());
        assertEquals(paymentMethod1.getId(), responsePaymentMethodList.get(0).getId());
        assertEquals(paymentMethod1.getUserId(), responsePaymentMethodList.get(0).getUserId());
        assertEquals(paymentMethod1.getPayMethodMode(), responsePaymentMethodList.get(0).getPayMethodMode());
    }

    @Test
    void testSavePaymentMethod() throws Exception {
        // Create a sample PaymentMethodDto
        PaymentMethodDto paymentMethodDto = new PaymentMethodDto();
        paymentMethodDto.setId(1);
        paymentMethodDto.setUserId(101);
        paymentMethodDto.setPayMethodMode(PayMethodMode.DEBIT);
        paymentMethodDto.setBankAccountDto(new BankAccountDto());
        paymentMethodDto.setDebitCardDto(new DebitCardDto());

        // Mock the paymentMethodService's behavior
        when(paymentMethodService.savePaymentMethod(any(PaymentMethodDto.class))).thenReturn(paymentMethodDto);

        // Send a POST request to the controller
        ResponseEntity<PaymentMethodDto> responseEntity = paymentMethodController.savePaymentMethods(paymentMethodDto);

        // Verify the response status
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());

        // Verify that the service method was called with the correct parameter
        verify(paymentMethodService, times(1)).savePaymentMethod(any(PaymentMethodDto.class));

        // Verify the response content
        PaymentMethodDto responsePaymentMethodDto = responseEntity.getBody();
        assertNotNull(responsePaymentMethodDto);
        assertEquals(paymentMethodDto.getId(), responsePaymentMethodDto.getId());
        assertEquals(paymentMethodDto.getUserId(), responsePaymentMethodDto.getUserId());
        assertEquals(paymentMethodDto.getPayMethodMode(), responsePaymentMethodDto.getPayMethodMode());
    }
}