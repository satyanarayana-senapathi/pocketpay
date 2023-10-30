package com.pockeypay.business.controller;

import com.pockeypay.business.dto.BusinessDto;
import com.pockeypay.business.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/businesses")
public class BusinessController {
    @Autowired
    public BusinessService businessService;

    @GetMapping
    public ResponseEntity<List<BusinessDto>> getAllBusinesses() {
        List<BusinessDto> businesses = businessService.getAllBusinesses();
        return new ResponseEntity<>(businesses, HttpStatus.OK);
    }


    @PatchMapping("/{id}")
    public ResponseEntity<BusinessDto> updateBusiness(@PathVariable int id, @RequestBody BusinessDto businessDto) {
        BusinessDto updatedBusiness = businessService.updateBusiness(id, businessDto);
        return ResponseEntity.ok(updatedBusiness);
    }
}
