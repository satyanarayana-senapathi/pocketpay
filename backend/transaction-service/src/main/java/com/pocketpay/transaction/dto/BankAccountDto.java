package com.pocketpay.transaction.dto;
import com.pocketpay.transaction.enums.AccountType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BankAccountDto {
    private int accountNumber;
    private String bankName;
    private String bankAddress;
    private String ifsc;
    private AccountType accountType;
}
