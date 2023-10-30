package com.pocketpay.transaction.dto;
import com.pocketpay.transaction.enums.PayMethodMode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentMethodDto {
    private int id;
    private int userId;
    private PayMethodMode payMethodMode;
    private BankAccountDto bankAccountDto;
    private DebitCardDto debitCardDto;
}
