package com.pocketpay.transaction.service;

import com.pocketpay.transaction.dto.DebitCardDto;
import com.pocketpay.transaction.entity.DebitCard;
import com.pocketpay.transaction.exception.TransactionException;
import com.pocketpay.transaction.repository.DebitCardRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DebitCardServiceImpl implements DebitCardService{

    @Autowired
    private DebitCardRepository debitCardRepository;
    private ModelMapper modelMapper;
    public DebitCardServiceImpl(){modelMapper = new ModelMapper();}
    @Override
    public DebitCardDto updateDebitCard(int id, DebitCardDto debitCardDto) {
        Optional<DebitCard> optionalDebitCard = debitCardRepository.findById(id);


        DebitCard debitCard = optionalDebitCard.get();

        if (debitCardDto.getExpiryDate() != null) {
            debitCard.setExpiryDate(debitCardDto.getExpiryDate());
        }

        if (debitCardDto.getCvv() != 0) {
            debitCard.setCvv(debitCardDto.getCvv());
        }

        try {
            DebitCard updatedDebitCard = debitCardRepository.save(debitCard);
            return modelMapper.map(updatedDebitCard, DebitCardDto.class);
        } catch (Exception ex) {
            throw new TransactionException("Error occurred while updating debit card", ex);
        }
    }
}
