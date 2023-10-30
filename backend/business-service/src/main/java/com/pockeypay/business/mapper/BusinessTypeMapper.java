package com.pockeypay.business.mapper;

import com.pockeypay.business.dto.BusinessTypeDto;
import com.pockeypay.business.entity.BusinessType;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

public class BusinessTypeMapper {
    @Autowired
    private static ModelMapper modelMapper;

    static {
        modelMapper = new ModelMapper();
    }

    public static BusinessType convertDtoToEntity(BusinessTypeDto businessTypeDto) {
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(businessTypeDto, BusinessType.class);
    }

    public static BusinessTypeDto convertEntityToDto(BusinessType businessType) {
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(businessType, BusinessTypeDto.class);
    }
}
