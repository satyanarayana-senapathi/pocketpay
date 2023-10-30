package com.pocketpay.transaction.controllers;

import com.pocketpay.transaction.dto.DebitCardDto;
import com.pocketpay.transaction.exception.NotFoundException;
import com.pocketpay.transaction.service.DebitCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/debit-cards")
public class DebitCardController {

    @Autowired
    private DebitCardService debitCardService;

    @PatchMapping("/{id}")
    public ResponseEntity<DebitCardDto> updateDebitCard(
            @PathVariable int id,
            @RequestBody DebitCardDto debitCardDto) {
        try {
            DebitCardDto updatedDebitCard = debitCardService.updateDebitCard(id, debitCardDto);
            return new ResponseEntity<>(updatedDebitCard, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
