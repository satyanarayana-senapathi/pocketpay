package com.dailycodebuffer.user.controllers;


import com.dailycodebuffer.user.dto.PersonalDetailsDto;
import com.dailycodebuffer.user.service.PersonalDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/personal-details")
public class PersonalDetailsController {
    @Autowired
    private PersonalDetailsService personalDetailsService;

    @GetMapping
    public ResponseEntity<List<PersonalDetailsDto>> findAllDetails() {
        return new ResponseEntity<>(personalDetailsService.getAllPersonalDetails(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PersonalDetailsDto> savePersonalDetails(@RequestBody PersonalDetailsDto personalDetailsDto) {
       return new ResponseEntity<>(personalDetailsService.savePersonalDetail(personalDetailsDto),HttpStatus.CREATED);
    }
}
