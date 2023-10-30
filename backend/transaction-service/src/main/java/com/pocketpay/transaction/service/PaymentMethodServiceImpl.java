package com.pocketpay.transaction.service;

import com.pocketpay.transaction.dto.PaymentMethodDto;
import com.pocketpay.transaction.entity.PaymentMethod;
import com.pocketpay.transaction.exception.PostException;
import com.pocketpay.transaction.exception.TransactionFailure;
import com.pocketpay.transaction.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class PaymentMethodServiceImpl implements PaymentMethodService{
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;
    private ModelMapper modelMapper;
    public PaymentMethodServiceImpl(){modelMapper = new ModelMapper();}

    @Override
    public List<PaymentMethodDto> getAllPayments() {
        try {
            List<PaymentMethod> paymentMethods = paymentMethodRepository.findAll();
            return paymentMethods.stream()
                    .map(paymentMethod -> modelMapper.map(paymentMethod, PaymentMethodDto.class))
                    .collect(Collectors.toList());
        } catch (Exception ex) {
            throw new TransactionFailure("Error occurred while fetching payment methods");
        }
    }

    @Override
    public PaymentMethodDto savePaymentMethod(PaymentMethodDto paymentMethodDto) {
        try {
            PaymentMethod paymentMethod = modelMapper.map(paymentMethodDto, PaymentMethod.class);
            PaymentMethod savedPaymentMethod = paymentMethodRepository.save(paymentMethod);
            return modelMapper.map(savedPaymentMethod, PaymentMethodDto.class);
        } catch (Exception ex) {
            throw new PostException("Error occurred while saving payment method", ex);
        }
    }
}
