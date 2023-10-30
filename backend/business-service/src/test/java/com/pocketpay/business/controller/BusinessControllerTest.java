package com.pocketpay.business.controller;

import com.pockeypay.business.controller.BusinessController;
import com.pockeypay.business.dto.BusinessDto;
import com.pockeypay.business.service.BusinessService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class BusinessControllerTest {
    @Mock
    private BusinessService businessService;

    @InjectMocks
    private BusinessController businessController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllBusinesses() {

        BusinessDto business1 = new BusinessDto();
        business1.setId(1);
        business1.setBusinessName("Business 1");

        BusinessDto business2 = new BusinessDto();
        business2.setId(2);
        business2.setBusinessName("Business 2");

        List<BusinessDto> mockBusinesses = Arrays.asList(business1, business2);

        when(businessService.getAllBusinesses()).thenReturn(mockBusinesses);

        ResponseEntity<List<BusinessDto>> responseEntity = businessController.getAllBusinesses();
        List<BusinessDto> result = responseEntity.getBody();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Business 1", result.get(0).getBusinessName());
        assertEquals("Business 2", result.get(1).getBusinessName());

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        verify(businessService, times(1)).getAllBusinesses();
    }


    @Test
    void testUpdateBusiness() {
        BusinessDto updatedBusinessDto = new BusinessDto();
        updatedBusinessDto.setId(1);
        updatedBusinessDto.setBusinessName("Updated Business");

        when(businessService.updateBusiness(1, updatedBusinessDto)).thenReturn(updatedBusinessDto);


        ResponseEntity<BusinessDto> response = businessController.updateBusiness(1, updatedBusinessDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Updated Business", response.getBody().getBusinessName());

        verify(businessService, times(1)).updateBusiness(1, updatedBusinessDto);
    }

}
