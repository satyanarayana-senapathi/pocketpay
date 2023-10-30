package com.pocketpay.business.controller;

import com.pockeypay.business.controller.BusinessTypeController;
import com.pockeypay.business.dto.BusinessTypeDto;
import com.pockeypay.business.entity.BusinessSize;
import com.pockeypay.business.service.BusinessTypeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BusinessTypeControllerTest {

    @Mock
    private BusinessTypeService businessTypeService;

    @Mock
    private BusinessTypeDto businessTypeDto;
    @InjectMocks
    private BusinessTypeController businessTypeController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    void testCreateBusinessType() {

        BusinessTypeDto mockBusinessTypeDto = new BusinessTypeDto();
        mockBusinessTypeDto.setCategory("Category");
        mockBusinessTypeDto.setSubCategory("SubCategory");
        mockBusinessTypeDto.setBusinessSize(BusinessSize.SIZE_10_50);

        when(businessTypeService.save(any(BusinessTypeDto.class))).thenReturn(mockBusinessTypeDto);

        ResponseEntity<BusinessTypeDto> expectedResponse = ResponseEntity.ok(mockBusinessTypeDto);

        ResponseEntity<BusinessTypeDto> response = businessTypeController.createBusinessType(businessTypeDto);

        verify(businessTypeService, times(1)).save(any(BusinessTypeDto.class));
        assertEquals(expectedResponse.getStatusCode(), response.getStatusCode());

        assertEquals(expectedResponse.getBody(), response.getBody());
    }

}
