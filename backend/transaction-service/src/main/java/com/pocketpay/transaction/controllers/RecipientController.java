package com.pocketpay.transaction.controllers;
import com.pocketpay.transaction.dto.RecipientDto;
import com.pocketpay.transaction.service.RecipientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipients")
public class RecipientController {
    @Autowired
    private RecipientService recipientService;
    @GetMapping
    public ResponseEntity<List<RecipientDto>> findAllRecipients(){
        return new ResponseEntity<>(recipientService.getAllRecipients(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<RecipientDto> saveRecipients(@RequestBody RecipientDto recipientDto){
        return  new ResponseEntity<>(recipientService.saveRecipient(recipientDto),HttpStatus.CREATED);
    }
}
