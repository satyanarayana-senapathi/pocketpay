package com.pockeypay.business.mapper;

import com.pockeypay.business.dto.BusinessDto;
import com.pockeypay.business.entity.Business;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

public class BusinessMapper {

    @Autowired
    private static ModelMapper modelMapper;

    static {
        modelMapper = new ModelMapper();
    }

    public static Business convertDtoToEntity(BusinessDto businessDto) {
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(businessDto, Business.class);
    }

    public static BusinessDto convertEntityToDto(Business business) {
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(business, BusinessDto.class);
    }

}
