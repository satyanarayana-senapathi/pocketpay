package com.pockeypay.business.service;

import com.pockeypay.business.dao.BusinessRepository;
import com.pockeypay.business.dto.BusinessDto;
import com.pockeypay.business.entity.Business;
import com.pockeypay.business.exception.BusinessNotFoundException;
import com.pockeypay.business.exception.InternalServerErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.pockeypay.business.mapper.BusinessMapper;

@Service
public class BusinessServiceImpl implements BusinessService {
    @Autowired
    public BusinessRepository businessRepository;


    @Override
    public List<BusinessDto> getAllBusinesses() {
        try {
            List<Business> businesses = businessRepository.findAll();
            return businesses.stream()
                    .map(BusinessMapper::convertEntityToDto)
                    .collect(Collectors.toList());
        } catch (InternalServerErrorException e) {
            throw new InternalServerErrorException("An internal server error occurred.");
        }
    }

    @Override
    public BusinessDto updateBusiness(int id, BusinessDto businessDto) {
        try {
            Optional<Business> optionalBusiness = businessRepository.findById(id);

            Business businessToUpdate = optionalBusiness.orElseThrow(() -> new BusinessNotFoundException("Business not found with id: " + id));

            if (businessDto.getBusinessName() != null) {
                businessToUpdate.setBusinessName(businessDto.getBusinessName());
            }
            if (businessDto.getRegisteredAddress() != null) {
                businessToUpdate.setRegisteredAddress(businessDto.getRegisteredAddress());
            }
            Business updatedBusiness = businessRepository.save(businessToUpdate);
            return BusinessMapper.convertEntityToDto(updatedBusiness);
        } catch (BusinessNotFoundException e) {
            throw new BusinessNotFoundException("Business not found with id: " + id);
        } catch (InternalServerErrorException ex) {
            throw new InternalServerErrorException("An internal server error occurred.");
        }
    }
}
