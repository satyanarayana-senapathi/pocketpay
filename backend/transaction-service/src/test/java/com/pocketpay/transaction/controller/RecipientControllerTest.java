package com.pocketpay.transaction.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pocketpay.transaction.controllers.RecipientController;
import com.pocketpay.transaction.dto.BankAccountDto;
import com.pocketpay.transaction.dto.RecipientDto;
import com.pocketpay.transaction.service.RecipientService;
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

public class RecipientControllerTest {

    @InjectMocks
    private RecipientController recipientController;

    @Mock
    private RecipientService recipientService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testFindAllRecipients() throws Exception {
        // Create a list of sample RecipientDto objects
        List<RecipientDto> recipientList = new ArrayList<>();
        RecipientDto recipient1 = new RecipientDto();
        recipient1.setEmail("recipient1@example.com");
        recipient1.setFirstName("John");
        recipient1.setLastName("Doe");
        recipient1.setBankAccountDto(new BankAccountDto());
        recipientList.add(recipient1);

        // Mock the recipientService's behavior
        when(recipientService.getAllRecipients()).thenReturn(recipientList);

        // Send a GET request to the controller
        ResponseEntity<List<RecipientDto>> responseEntity = recipientController.findAllRecipients();

        // Verify the response status
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verify the service method was called
        verify(recipientService, times(1)).getAllRecipients();

        // Verify the response content
        List<RecipientDto> responseRecipientList = responseEntity.getBody();
        assertNotNull(responseRecipientList);
        assertEquals(recipientList.size(), responseRecipientList.size());
        assertEquals(recipient1.getEmail(), responseRecipientList.get(0).getEmail());
        assertEquals(recipient1.getFirstName(), responseRecipientList.get(0).getFirstName());
        assertEquals(recipient1.getLastName(), responseRecipientList.get(0).getLastName());
    }


    @Test
    void testSaveRecipient() throws Exception {
        // Create a sample RecipientDto
        RecipientDto recipientDto = new RecipientDto();
        recipientDto.setId(1);
        recipientDto.setEmail("recipient1@example.com");
        recipientDto.setFirstName("John");
        recipientDto.setLastName("Doe");
        recipientDto.setBankAccountDto(new BankAccountDto());

        // Mock the recipientService's behavior
        when(recipientService.saveRecipient(any(RecipientDto.class))).thenReturn(recipientDto);

        // Send a POST request to the controller
        ResponseEntity<RecipientDto> responseEntity = recipientController.saveRecipients(recipientDto);

        // Verify the response status
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());

        // Verify that the service method was called with the correct parameter
        verify(recipientService, times(1)).saveRecipient(any(RecipientDto.class));

        // Verify the response content
        RecipientDto responseRecipientDto = responseEntity.getBody();
        assertNotNull(responseRecipientDto);
        assertEquals(recipientDto.getId(), responseRecipientDto.getId());
        assertEquals(recipientDto.getEmail(), responseRecipientDto.getEmail());
        assertEquals(recipientDto.getFirstName(), responseRecipientDto.getFirstName());
        assertEquals(recipientDto.getLastName(), responseRecipientDto.getLastName());
    }
}

