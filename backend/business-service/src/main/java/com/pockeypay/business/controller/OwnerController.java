package com.pockeypay.business.controller;


import com.pockeypay.business.dto.BusinessDto;
import com.pockeypay.business.dto.OwnerDto;
import com.pockeypay.business.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owners")
public class OwnerController {
    @Autowired
    private OwnerService ownerService;

    @GetMapping
    public ResponseEntity<List<OwnerDto>> getAllOwners() {
        List<OwnerDto> owners = ownerService.getAllOwners();
        return new ResponseEntity<>(owners, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OwnerDto> createOwner(@RequestBody OwnerDto ownerDto) {
        OwnerDto createOwner = ownerService.save(ownerDto);
        return ResponseEntity.ok(createOwner);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<OwnerDto> updateOwner(@PathVariable int id, @RequestBody OwnerDto ownerDto) {
        OwnerDto updatedOwner = ownerService.updateOwner(id, ownerDto);
        return ResponseEntity.ok(updatedOwner);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOwner(@PathVariable int id) {
        ownerService.deleteOwner(id);
        return ResponseEntity.ok("Owner with ID " + id + " has been deleted.");
    }
}
