package com.pocketpay.business.service;

import static org.mockito.Mockito.*;

import com.pockeypay.business.dao.BusinessRepository;
import com.pockeypay.business.dao.OwnerRepository;
import com.pockeypay.business.dto.OwnerDto;
import com.pockeypay.business.entity.Business;
import com.pockeypay.business.entity.Owner;
import com.pockeypay.business.entity.OwnerSize;
import com.pockeypay.business.exception.BusinessNotFoundException;
import com.pockeypay.business.exception.CustomPersistenceException;
import com.pockeypay.business.exception.InternalServerErrorException;
import com.pockeypay.business.exception.OwnerNotFoundException;
import com.pockeypay.business.service.OwnerServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

class OwnerServiceImplTest {

    @Mock
    private OwnerRepository ownerRepository;
    @Mock
    private BusinessRepository businessRepository;
    @InjectMocks
    private OwnerServiceImpl ownerService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

    }

    @Test
    void testSave() {
        OwnerDto ownerDto = new OwnerDto();
        ownerDto.setFirstName("John");
        ownerDto.setLastName("Doe");
        ownerDto.setBusinessId(1);

        Business business = new Business();
        business.setId(1);

        when(businessRepository.findById(1)).thenReturn(Optional.of(business));

        Owner savedOwner = new Owner();
        savedOwner.setId(1);
        savedOwner.setFirstName(ownerDto.getFirstName());
        savedOwner.setLastName(ownerDto.getLastName());
        savedOwner.setBusinessId(business);

        when(ownerRepository.save(any(Owner.class))).thenReturn(savedOwner);

        OwnerDto savedOwnerDto = ownerService.save(ownerDto);

        assertNotNull(savedOwnerDto);
        assertEquals(1, savedOwnerDto.getId());
        assertEquals("John", savedOwnerDto.getFirstName());
        assertEquals("Doe", savedOwnerDto.getLastName());
        assertEquals(1, savedOwnerDto.getBusinessId());
    }

    @Test
    void testGetAllOwners() {
        List<Owner> ownerEntities = new ArrayList<>();
        ownerEntities.add(new Owner());
        ownerEntities.add(new Owner());
        when(ownerRepository.findAll()).thenReturn(ownerEntities);

        List<OwnerDto> ownerDtos = ownerService.getAllOwners();

        assertNotNull(ownerDtos);
        assertEquals(2, ownerDtos.size());
    }


    @Test
    void testDeleteOwner() {
        Owner existingOwnerEntity = new Owner();
        existingOwnerEntity.setId(1);
        when(ownerRepository.findById(eq(1))).thenReturn(Optional.of(existingOwnerEntity));

        ownerService.deleteOwner(1);
        verify(ownerRepository).delete(eq(existingOwnerEntity));
    }

    @Test
    void testUpdateOwner() {
        int ownerId = 1;
        OwnerDto ownerDto = new OwnerDto();
        ownerDto.setFirstName("John");
        ownerDto.setLastName("Doe");
        ownerDto.setCountryOfResidency("USA");
        ownerDto.setDob(new Date());
        ownerDto.setType(OwnerSize.director);
        ownerDto.setBusinessId(1);

        Owner existingOwner = new Owner();
        existingOwner.setId(ownerId);

        Business existingBusiness = new Business();
        existingBusiness.setId(ownerDto.getBusinessId());

        when(ownerRepository.findById(eq(ownerId))).thenReturn(Optional.of(existingOwner));
        when(businessRepository.findById(eq(ownerDto.getBusinessId()))).thenReturn(Optional.of(existingBusiness));
        when(ownerRepository.save(any(Owner.class))).thenReturn(existingOwner);

        OwnerDto updatedOwnerDto = ownerService.updateOwner(ownerId, ownerDto);

        assertEquals(ownerDto.getFirstName(), updatedOwnerDto.getFirstName());
        assertEquals(ownerDto.getLastName(), updatedOwnerDto.getLastName());
        assertEquals(ownerDto.getCountryOfResidency(), updatedOwnerDto.getCountryOfResidency());
        assertEquals(ownerDto.getDob(), updatedOwnerDto.getDob());
        assertEquals(ownerDto.getType(), updatedOwnerDto.getType());
        assertEquals(ownerDto.getBusinessId(), updatedOwnerDto.getBusinessId());
    }

    @Test
    void testUpdateOwnerNotFound() {
        int ownerId = 1;
        OwnerDto ownerDto = new OwnerDto();

        when(ownerRepository.findById(eq(ownerId))).thenReturn(Optional.empty());

        assertThrows(OwnerNotFoundException.class, () -> {
            ownerService.updateOwner(ownerId, ownerDto);
        });
    }

    @Test
    void testUpdateOwnerBusinessNotFound() {
        int ownerId = 1;
        OwnerDto ownerDto = new OwnerDto();
        ownerDto.setBusinessId(1);

        Owner existingOwner = new Owner();
        existingOwner.setId(ownerId);

        when(ownerRepository.findById(eq(ownerId))).thenReturn(Optional.of(existingOwner));
        when(businessRepository.findById(eq(ownerDto.getBusinessId()))).thenReturn(Optional.empty());

        assertThrows(BusinessNotFoundException.class, () -> {
            ownerService.updateOwner(ownerId, ownerDto);
        });
    }

    @Test
    void testSaveWithCustomPersistenceException() {
        OwnerDto ownerDto = new OwnerDto();
        ownerDto.setFirstName("John");
        ownerDto.setLastName("Doe");
        ownerDto.setBusinessId(1);

        Business business = new Business();
        business.setId(1);

        when(businessRepository.findById(1)).thenReturn(Optional.of(business));

        when(ownerRepository.save(any(Owner.class))).thenThrow(new CustomPersistenceException("Database error", new RuntimeException("Mocked cause")));

        assertThrows(CustomPersistenceException.class, () -> {
            ownerService.save(ownerDto);
        });
    }

    @Test
    void testGetAllOwnersWithInternalServerError() {
        when(ownerRepository.findAll()).thenThrow(new InternalServerErrorException("Internal server error"));

        assertThrows(InternalServerErrorException.class, () -> {
            ownerService.getAllOwners();
        });
    }

    @Test
    void testUpdateOwnerWithCustomPersistenceException() {
        int ownerId = 1;
        OwnerDto ownerDto = new OwnerDto();
        ownerDto.setFirstName("John");
        ownerDto.setLastName("Doe");
        ownerDto.setCountryOfResidency("USA");
        ownerDto.setDob(new Date());
        ownerDto.setType(OwnerSize.director);
        ownerDto.setBusinessId(1);

        Owner existingOwner = new Owner();
        existingOwner.setId(ownerId);

        Business existingBusiness = new Business();
        existingBusiness.setId(ownerDto.getBusinessId());

        when(ownerRepository.findById(eq(ownerId))).thenReturn(Optional.of(existingOwner));
        when(businessRepository.findById(eq(ownerDto.getBusinessId()))).thenReturn(Optional.of(existingBusiness));
        when(ownerRepository.save(any(Owner.class))).thenThrow(new CustomPersistenceException("Database error", new RuntimeException("Mocked cause")));

        assertThrows(CustomPersistenceException.class, () -> {
            ownerService.updateOwner(ownerId, ownerDto);
        });
    }
}
