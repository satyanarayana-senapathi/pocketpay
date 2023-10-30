package com.pocketpay.transaction.controllers;

import com.pocketpay.transaction.dto.PaymentMethodDto;
import com.pocketpay.transaction.service.PaymentMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment-methods")
public class PaymentMethodController {
    @Autowired
    private PaymentMethodService paymentMethodService;
    @GetMapping
    public ResponseEntity<List<PaymentMethodDto>> findAllPaymentMethods(){
        return new ResponseEntity<>(paymentMethodService.getAllPayments(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<PaymentMethodDto> savePaymentMethods(@RequestBody PaymentMethodDto paymentMethodDto){
       return  new ResponseEntity<>(paymentMethodService.savePaymentMethod(paymentMethodDto),HttpStatus.CREATED);
    }

}
