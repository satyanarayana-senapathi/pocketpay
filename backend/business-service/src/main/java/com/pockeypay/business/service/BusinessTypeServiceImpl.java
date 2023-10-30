package com.pockeypay.business.service;

import com.pockeypay.business.dao.BusinessTypeRepository;
import com.pockeypay.business.dto.BusinessTypeDto;
import com.pockeypay.business.entity.BusinessType;
import com.pockeypay.business.exception.CustomPersistenceException;
import com.pockeypay.business.mapper.BusinessTypeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessTypeServiceImpl implements BusinessTypeService {

    @Autowired
    private BusinessTypeRepository businessTypeRepository;

    @Override
    public BusinessTypeDto save(BusinessTypeDto businessTypeDto) {
        try {
            BusinessType businessType = BusinessTypeMapper.convertDtoToEntity(businessTypeDto);
            businessType = businessTypeRepository.save(businessType);
            return BusinessTypeMapper.convertEntityToDto(businessType);
        } catch (CustomPersistenceException px) {
            throw new CustomPersistenceException("Error occurred while saving business type.", px);
        }
    }
}
