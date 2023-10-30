package com.dailycodebuffer.user.service;

import com.dailycodebuffer.user.dto.PersonalDetailsDto;
import com.dailycodebuffer.user.dto.UserDto;
import com.dailycodebuffer.user.entity.PersonalDetails;
import com.dailycodebuffer.user.entity.User;
import com.dailycodebuffer.user.exception.NotFoundException;
import com.dailycodebuffer.user.exception.PostException;
import com.dailycodebuffer.user.repository.PersonalDetailsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;


public class PersonalDetailsImplTest {

    @Mock
    private PersonalDetailsRepository personalDetailsRepository;

    @InjectMocks
    private PersonalDetailsImpl personalDetailsService;

    private ModelMapper modelMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        modelMapper = new ModelMapper();
    }

    @Test
    public void testGetAllPersonalDetails_Success() {

        List<PersonalDetails> personalDetailsList = new ArrayList<>();
        personalDetailsList.add(new PersonalDetails(
                1,
                "pooja",
                "kundala",
                null,
                "hyd",
                "hyd",
                "562431",
                LocalDate.parse("1998-05-12"),
                new User(
                        1,
                        "pooja@gmail.com",
                        "Pooja@151",
                        new BigInteger("9014328132"),
                        "91"
                )));
        when(personalDetailsRepository.findAll()).thenReturn(personalDetailsList);

        List<PersonalDetailsDto> result = personalDetailsService.getAllPersonalDetails();

        assertNotNull(result);
        assertEquals(personalDetailsList.size(), result.size());

        verify(personalDetailsRepository, times(1)).findAll();
    }

    @Test
    public void testGetAllPersonalDetails_Failure() {
        when(personalDetailsRepository.findAll()).thenThrow(new RuntimeException("Mock Exception"));

        assertThrows(NotFoundException.class, () -> personalDetailsService.getAllPersonalDetails());

        verify(personalDetailsRepository, times(1)).findAll();
    }

    @Test
    public void testSavePersonalDetail_Success() {
        PersonalDetailsDto inputDto = new PersonalDetailsDto(
                1,
                "pooja",
                "kundala",
                null,
                "hyd",
                "hyd",
                "562431",
                LocalDate.parse("1998-05-12"),
                new UserDto(
                        1,
                        "pooja@gmail.com",
                        "Pooja@151",
                        new BigInteger("9014328132"),
                        "91"
                )
        );
        PersonalDetails entityToSave = modelMapper.map(inputDto, PersonalDetails.class);
        when(personalDetailsRepository.save(any(PersonalDetails.class))).thenReturn(entityToSave);

        PersonalDetailsDto result = personalDetailsService.savePersonalDetail(inputDto);

        assertNotNull(result);

        verify(personalDetailsRepository, times(1)).save(any(PersonalDetails.class));
    }

    @Test
    public void testSavePersonalDetail_Failure() {
        when(personalDetailsRepository.save(any(PersonalDetails.class))).thenThrow(new RuntimeException("Mock Exception"));

        PersonalDetailsDto inputDto = new PersonalDetailsDto(/* fill with necessary details */);
        assertThrows(PostException.class, () -> personalDetailsService.savePersonalDetail(inputDto));

        verify(personalDetailsRepository, times(1)).save(any(PersonalDetails.class));
    }
}
