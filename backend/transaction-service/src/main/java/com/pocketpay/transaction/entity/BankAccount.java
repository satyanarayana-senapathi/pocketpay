package com.pocketpay.transaction.entity;

import com.pocketpay.transaction.enums.AccountType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "bank_account")
public class BankAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountNumber;
    private String bankName;
    private String bankAddress;
    private String ifsc;
    @Enumerated(EnumType.STRING)
    private AccountType accountType;
}
