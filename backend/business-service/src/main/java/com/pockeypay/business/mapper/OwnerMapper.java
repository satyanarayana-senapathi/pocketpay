package com.pockeypay.business.mapper;

import com.pockeypay.business.dto.OwnerDto;
import com.pockeypay.business.entity.Business;
import com.pockeypay.business.entity.Owner;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

public class OwnerMapper {
    @Autowired
    private static ModelMapper modelMapper;

    static {
        modelMapper = new ModelMapper();
    }

    public static Owner convertDtoToEntity(OwnerDto ownerDto) {
        Owner owner = new Owner();
        owner.setId(ownerDto.getId());
        owner.setFirstName(ownerDto.getFirstName());
        owner.setLastName(ownerDto.getLastName());
        owner.setCountryOfResidency(ownerDto.getCountryOfResidency());
        owner.setDob(ownerDto.getDob());
        owner.setType(ownerDto.getType());

        Business business = new Business();
        business.setId(ownerDto.getBusinessId());
        owner.setBusinessId(business);

        return owner;
    }

    public static OwnerDto convertEntityToDto(Owner owner) {
        if (owner == null) {
            return null;
        }
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        modelMapper.addMappings(new PropertyMap<Owner, OwnerDto>() {
            @Override
            protected void configure() {
                map().setBusinessId(source.getBusinessId().getId());
            }
        });

        return modelMapper.map(owner, OwnerDto.class);
    }
}
