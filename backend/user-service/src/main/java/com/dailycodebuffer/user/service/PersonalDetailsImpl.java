package com.dailycodebuffer.user.service;

import com.dailycodebuffer.user.dto.PersonalDetailsDto;
import com.dailycodebuffer.user.entity.PersonalDetails;
import com.dailycodebuffer.user.exception.NotFoundException;
import com.dailycodebuffer.user.exception.PostException;
import com.dailycodebuffer.user.repository.PersonalDetailsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonalDetailsImpl implements PersonalDetailsService {

    @Autowired
    private PersonalDetailsRepository personalDetailsRepository;
    private ModelMapper  modelMapper;

    public PersonalDetailsImpl(){
        modelMapper = new ModelMapper();
    }

    @Override
    public List<PersonalDetailsDto> getAllPersonalDetails() {
        try{
            List<PersonalDetails> personalDetails = personalDetailsRepository.findAll();
            return personalDetails.stream().map(personalDetail -> modelMapper.map(personalDetail,PersonalDetailsDto.class)).collect(Collectors.toList());
        }catch (Exception e){
            throw new NotFoundException("failed to retrieve data");
        }
    }

    @Override
    public PersonalDetailsDto savePersonalDetail(PersonalDetailsDto personalDetailsDto) {
        try{
            PersonalDetails personalDetails = modelMapper.map(personalDetailsDto , PersonalDetails.class);
            PersonalDetails savedPersonalDetails = personalDetailsRepository.save(personalDetails);
            return modelMapper.map(savedPersonalDetails, PersonalDetailsDto.class);
        }catch (Exception e){
            throw new PostException("Failed to create personal details");
        }
    }
}
