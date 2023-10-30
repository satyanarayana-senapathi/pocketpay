package com.pocketpay.transaction.service;

import com.pocketpay.transaction.dto.RecipientDto;

import java.util.List;

public interface RecipientService {
    List<RecipientDto> getAllRecipients();
    RecipientDto saveRecipient(RecipientDto recipientDto);
}
