package com.pocketpay.transaction.dto;

import com.pocketpay.transaction.enums.Status;
import com.pocketpay.transaction.enums.TransferType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDto {
    private int id;
    private BigDecimal amountSent;
    private String paymentPurpose;
    private String fromCurrency;
    private String toCurrency;
    private BigDecimal transferRate;
    private TransferType transferType;
    private Status status;

}
