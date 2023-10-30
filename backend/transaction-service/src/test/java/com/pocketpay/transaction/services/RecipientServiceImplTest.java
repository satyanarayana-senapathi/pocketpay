package com.pocketpay.transaction.services;

import com.pocketpay.transaction.dto.RecipientDto;
import com.pocketpay.transaction.entity.Recipient;
import com.pocketpay.transaction.exception.InternalServerException;
import com.pocketpay.transaction.exception.PostException;
import com.pocketpay.transaction.repository.RecipientRepository;
import com.pocketpay.transaction.service.RecipientServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class RecipientServiceImplTest {

    @InjectMocks
    private RecipientServiceImpl recipientService;

    @Mock
    private RecipientRepository recipientRepository;

    private ModelMapper modelMapper = new ModelMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllRecipients() {
        // Create a list of sample Recipient entities
        List<Recipient> recipientEntities = new ArrayList<>();
        recipientEntities.add(new Recipient());
        recipientEntities.add(new Recipient());

        // Mock the recipientRepository's behavior to return the list of entities
        when(recipientRepository.findAll()).thenReturn(recipientEntities);

        // Call the service method
        List<RecipientDto> recipientDtos = recipientService.getAllRecipients();

        // Verify that the repository's findAll method was called
        verify(recipientRepository, times(1)).findAll();

        // Verify that the returned list is not empty and contains the same number of elements as the entities
        assertNotNull(recipientDtos);
        assertEquals(recipientEntities.size(), recipientDtos.size());
    }

    @Test
    void testSaveRecipient() {
        // Create a sample RecipientDto
        RecipientDto recipientDto = new RecipientDto();
        recipientDto.setId(1);

        // Create a corresponding Recipient entity
        Recipient recipientEntity = modelMapper.map(recipientDto, Recipient.class);

        // Mock the recipientRepository's behavior to return the entity when saved
        when(recipientRepository.save(any(Recipient.class))).thenReturn(recipientEntity);

        // Call the service method
        RecipientDto savedRecipientDto = recipientService.saveRecipient(recipientDto);

        // Verify that the repository's save method was called with the expected parameter
        verify(recipientRepository, times(1)).save(any(Recipient.class));

        // Verify that the returned DTO matches the input DTO
        assertNotNull(savedRecipientDto);
        assertEquals(recipientDto.getId(), savedRecipientDto.getId());
    }

    @Test
    void testSaveRecipientWithException() {
        // Create a sample RecipientDto
        RecipientDto recipientDto = new RecipientDto();

        // Mock the recipientRepository's behavior to throw an exception when saving
        when(recipientRepository.save(any(Recipient.class))).thenThrow(new RuntimeException("Simulated error"));

        // Call the service method and expect a PostException to be thrown
        assertThrows(PostException.class, () -> recipientService.saveRecipient(recipientDto));

        // Verify that the repository's save method was called
        verify(recipientRepository, times(1)).save(any(Recipient.class));
    }
}

