package com.pocketpay.business.service;

import com.pockeypay.business.dao.BusinessRepository;
import com.pockeypay.business.dto.BusinessDto;
import com.pockeypay.business.entity.Business;
import com.pockeypay.business.exception.BusinessNotFoundException;
import com.pockeypay.business.exception.InternalServerErrorException;
import com.pockeypay.business.service.BusinessService;
import com.pockeypay.business.service.BusinessServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BusinessServiceImplTest {

    @Mock
    private BusinessRepository businessRepository;

    @InjectMocks
    private BusinessService businessService = new BusinessServiceImpl();

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllBusinesses() {
        Business business1 = new Business();
        business1.setId(1);
        business1.setBusinessName("Business 1");

        Business business2 = new Business();
        business2.setId(2);
        business2.setBusinessName("Business 2");

        List<Business> mockBusinesses = Arrays.asList(business1, business2);

        when(businessRepository.findAll()).thenReturn(mockBusinesses);

        List<BusinessDto> businessDtos = businessService.getAllBusinesses();

        assertEquals(2, businessDtos.size());
        assertEquals("Business 1", businessDtos.get(0).getBusinessName());
        assertEquals("Business 2", businessDtos.get(1).getBusinessName());

        verify(businessRepository, times(1)).findAll();
    }

    @Test
    void testUpdateBusiness_Success() {
        BusinessDto businessDto = new BusinessDto();
        businessDto.setBusinessName("New Business Name");
        businessDto.setRegisteredAddress("New Address");

        Business existingBusiness = new Business();
        existingBusiness.setId(1);
        existingBusiness.setBusinessName("Old Business Name");
        existingBusiness.setRegisteredAddress("Old Address");

        when(businessRepository.findById(1)).thenReturn(Optional.of(existingBusiness));
        when(businessRepository.save(any(Business.class))).thenAnswer(invocation -> invocation.getArgument(0));

        BusinessDto updatedBusinessDto = businessService.updateBusiness(1, businessDto);

        verify(businessRepository, times(1)).findById(1);
        verify(businessRepository, times(1)).save(any(Business.class));

        assertNotNull(updatedBusinessDto);
        assertEquals("New Business Name", updatedBusinessDto.getBusinessName());
        assertEquals("New Address", updatedBusinessDto.getRegisteredAddress());
    }

    @Test
    void testUpdateBusiness_NotFound() {
        when(businessRepository.findById(1)).thenReturn(Optional.empty());

        BusinessDto updatedBusinessDto = new BusinessDto();
        updatedBusinessDto.setBusinessName("New Business Name");

        assertThrows(BusinessNotFoundException.class, () -> businessService.updateBusiness(1, updatedBusinessDto));
        verify(businessRepository, times(1)).findById(1);
        verify(businessRepository, never()).save(any(Business.class));
    }

    @Test
    void testGetAllBusinesses_InternalServerError() {
        when(businessRepository.findAll()).thenThrow(new InternalServerErrorException("Database error"));

        assertThrows(InternalServerErrorException.class, () -> businessService.getAllBusinesses());

        verify(businessRepository, times(1)).findAll();
    }

    @Test
    void testUpdateBusiness_InternalServerError() {
        BusinessDto businessDto = new BusinessDto();
        businessDto.setBusinessName("New Business Name");

        Business existingBusiness = new Business();
        existingBusiness.setId(1);
        existingBusiness.setBusinessName("Old Business Name");

        when(businessRepository.findById(1)).thenReturn(Optional.of(existingBusiness));
        when(businessRepository.save(any(Business.class))).thenThrow(new InternalServerErrorException("Database error"));

        assertThrows(InternalServerErrorException.class, () -> businessService.updateBusiness(1, businessDto));

        verify(businessRepository, times(1)).findById(1);
        verify(businessRepository, times(1)).save(any(Business.class));
    }
}
