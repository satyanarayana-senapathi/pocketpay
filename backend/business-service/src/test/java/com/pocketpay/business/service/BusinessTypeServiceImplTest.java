package com.pocketpay.business.service;

import com.pockeypay.business.dao.BusinessTypeRepository;
import com.pockeypay.business.dto.BusinessTypeDto;
import com.pockeypay.business.entity.BusinessSize;
import com.pockeypay.business.entity.BusinessType;
import com.pockeypay.business.exception.CustomPersistenceException;
import com.pockeypay.business.mapper.BusinessTypeMapper;
import com.pockeypay.business.service.BusinessTypeService;
import com.pockeypay.business.service.BusinessTypeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BusinessTypeServiceImplTest {
    @Mock
    private BusinessTypeRepository businessTypeRepository;

    @InjectMocks
    private BusinessTypeService businessTypeService = new BusinessTypeServiceImpl();

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testSaveBusinessType() {
        BusinessTypeDto businessTypeDto = new BusinessTypeDto();
        businessTypeDto.setCategory("Category");
        businessTypeDto.setSubCategory("SubCategory");
        businessTypeDto.setBusinessSize(BusinessSize.SIZE_10_50);

        BusinessType businessType = BusinessTypeMapper.convertDtoToEntity(businessTypeDto);

        when(businessTypeRepository.save(any(BusinessType.class))).thenReturn(businessType);

        BusinessTypeDto savedBusinessTypeDto = businessTypeService.save(businessTypeDto);

        verify(businessTypeRepository, times(1)).save(any(BusinessType.class));

        assertNotNull(savedBusinessTypeDto);
        assertEquals(businessTypeDto.getCategory(), savedBusinessTypeDto.getCategory());
        assertEquals(businessTypeDto.getSubCategory(), savedBusinessTypeDto.getSubCategory());
        assertEquals(businessTypeDto.getBusinessSize(), savedBusinessTypeDto.getBusinessSize());

    }

    @Test
    void testSaveBusinessType_CustomPersistenceException() {
        BusinessTypeDto businessTypeDto = new BusinessTypeDto();
        businessTypeDto.setCategory("Category");
        businessTypeDto.setSubCategory("SubCategory");
        businessTypeDto.setBusinessSize(BusinessSize.SIZE_10_50);

        BusinessType businessType = BusinessTypeMapper.convertDtoToEntity(businessTypeDto);

        when(businessTypeRepository.save(any(BusinessType.class))).thenThrow(new CustomPersistenceException("Database error", new RuntimeException("Mocked cause")));

        assertThrows(CustomPersistenceException.class, () -> businessTypeService.save(businessTypeDto));

        verify(businessTypeRepository, times(1)).save(any(BusinessType.class));
    }
}
