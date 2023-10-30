package com.pockeypay.business.controller;

import com.pockeypay.business.dto.BusinessTypeDto;
import com.pockeypay.business.service.BusinessTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/business-types")
public class BusinessTypeController {

    @Autowired
    private BusinessTypeService businessTypeService;

    @PostMapping
    public ResponseEntity<BusinessTypeDto> createBusinessType(@RequestBody BusinessTypeDto businessTypeDto) {
        BusinessTypeDto createBusinessType = businessTypeService.save(businessTypeDto);
        return ResponseEntity.ok(createBusinessType);
    }

}
