package com.dailycodebuffer.user.service;

import com.dailycodebuffer.user.dto.PersonalDetailsDto;

import java.util.List;

public interface PersonalDetailsService {
    List<PersonalDetailsDto> getAllPersonalDetails();
    PersonalDetailsDto savePersonalDetail(PersonalDetailsDto personalDetailsDto);
}
