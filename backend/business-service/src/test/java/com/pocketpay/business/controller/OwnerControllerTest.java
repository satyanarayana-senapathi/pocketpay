package com.pocketpay.business.controller;

import com.pockeypay.business.controller.OwnerController;
import com.pockeypay.business.dto.OwnerDto;
import com.pockeypay.business.service.OwnerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class OwnerControllerTest {

    @Mock
    private OwnerService ownerService;

    @InjectMocks
    private OwnerController ownerController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testCreateOwner() {
        OwnerDto ownerDto = new OwnerDto();
        ownerDto.setFirstName("Jane");
        ownerDto.setLastName("Smith");

        OwnerDto createdOwnerDto = new OwnerDto();
        createdOwnerDto.setId(2);
        createdOwnerDto.setFirstName(ownerDto.getFirstName());
        createdOwnerDto.setLastName(ownerDto.getLastName());

        when(ownerService.save(any(OwnerDto.class))).thenReturn(createdOwnerDto);

        ResponseEntity<OwnerDto> responseEntity = ownerController.createOwner(ownerDto);

        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        OwnerDto responseBody = responseEntity.getBody();
        assertNotNull(responseBody);
        assertEquals(2, responseBody.getId());
        assertEquals("Jane", responseBody.getFirstName());
        assertEquals("Smith", responseBody.getLastName());
    }

    @Test
    void testGetAllOwners() {
        List<OwnerDto> ownerList = new ArrayList<>();

        ResponseEntity<List<OwnerDto>> responseEntity = new ResponseEntity<>(ownerList, HttpStatus.OK);

        when(ownerService.getAllOwners()).thenReturn(ownerList);

        ResponseEntity<List<OwnerDto>> result = ownerController.getAllOwners();

        assertEquals(responseEntity.getStatusCode(), result.getStatusCode());
        assertEquals(responseEntity.getBody(), result.getBody());
    }

    @Test
    void testDeleteOwner() {
        int ownerId = 1;

        ResponseEntity<String> response = ownerController.deleteOwner(ownerId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Owner with ID " + ownerId + " has been deleted.", response.getBody());
        verify(ownerService).deleteOwner(ownerId);
    }

    @Test
    public void testUpdateOwner() {
        int ownerId = 1;
        OwnerDto ownerDto = new OwnerDto();

        when(ownerService.updateOwner(eq(ownerId), any(OwnerDto.class))).thenReturn(ownerDto);

        ResponseEntity<OwnerDto> response = ownerController.updateOwner(ownerId, ownerDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(ownerDto, response.getBody());
    }

}