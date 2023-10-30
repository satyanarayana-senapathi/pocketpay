package com.pockeypay.business.service;

import com.pockeypay.business.dao.BusinessRepository;
import com.pockeypay.business.dao.OwnerRepository;
import com.pockeypay.business.dto.OwnerDto;
import com.pockeypay.business.entity.Business;
import com.pockeypay.business.entity.Owner;
import com.pockeypay.business.exception.BusinessNotFoundException;
import com.pockeypay.business.exception.CustomPersistenceException;
import com.pockeypay.business.exception.InternalServerErrorException;
import com.pockeypay.business.exception.OwnerNotFoundException;
import com.pockeypay.business.mapper.OwnerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.PersistenceException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OwnerServiceImpl implements OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;
    @Autowired
    private BusinessRepository businessRepository;

    @Override
    public OwnerDto save(OwnerDto ownerDto) {
        try {
            Owner owner = OwnerMapper.convertDtoToEntity(ownerDto);
            Business business = businessRepository.findById(ownerDto.getBusinessId()).orElseThrow(() -> new BusinessNotFoundException("Business not found"));
            owner.setBusinessId(business);
            owner = ownerRepository.save(owner);
            return OwnerMapper.convertEntityToDto(owner);
        } catch (CustomPersistenceException px) {
            throw new CustomPersistenceException("Error occurred while saving owner.", px);
        }
    }

    @Override
    public List<OwnerDto> getAllOwners() {
        try {
            List<Owner> owners = ownerRepository.findAll();
            return owners.stream().map(OwnerMapper::convertEntityToDto).collect(Collectors.toList());
        } catch (InternalServerErrorException e) {
            throw new InternalServerErrorException("An internal server error occurred.");
        }
    }

    @Override
    public OwnerDto updateOwner(int id, OwnerDto ownerDto) {
        try {
            Owner existingOwner = ownerRepository.findById(id).orElseThrow(() -> new OwnerNotFoundException("Owner not found"));

            if (ownerDto.getFirstName() != null) {
                existingOwner.setFirstName(ownerDto.getFirstName());
            }
            if (ownerDto.getLastName() != null) {
                existingOwner.setLastName(ownerDto.getLastName());
            }
            if (ownerDto.getCountryOfResidency() != null) {
                existingOwner.setCountryOfResidency(ownerDto.getCountryOfResidency());
            }
            if (ownerDto.getDob() != null) {
                existingOwner.setDob(ownerDto.getDob());
            }
            if (ownerDto.getType() != null) {
                existingOwner.setType(ownerDto.getType());
            }
            if (ownerDto.getBusinessId() != -1) {
                Business business = businessRepository.findById(ownerDto.getBusinessId()).orElseThrow(() -> new BusinessNotFoundException("Business not found"));
                existingOwner.setBusinessId(business);
            }

            existingOwner = ownerRepository.save(existingOwner);
            return OwnerMapper.convertEntityToDto(existingOwner);
        } catch (OwnerNotFoundException ex) {
            throw new OwnerNotFoundException("Owner not found with: " + id);
        } catch (CustomPersistenceException px) {
            throw new CustomPersistenceException("Error occurred while saving owner.", px);
        }
    }

    @Override
    public void deleteOwner(int id) {
        Owner owner = ownerRepository.findById(id).orElseThrow(() -> new OwnerNotFoundException("Owner not found"));

        ownerRepository.delete(owner);
    }
}