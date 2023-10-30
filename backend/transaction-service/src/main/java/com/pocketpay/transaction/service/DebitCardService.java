package com.pocketpay.transaction.service;

import com.pocketpay.transaction.dto.DebitCardDto;

public interface DebitCardService {
    DebitCardDto updateDebitCard(int id, DebitCardDto debitCardDto);
}
