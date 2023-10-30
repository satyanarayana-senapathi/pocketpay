package com.pocketpay.transaction.service;

import com.pocketpay.transaction.dto.PaymentMethodDto;

import java.util.List;

public interface PaymentMethodService {
    List<PaymentMethodDto> getAllPayments();
    PaymentMethodDto savePaymentMethod(PaymentMethodDto paymentMethodDto);

}
