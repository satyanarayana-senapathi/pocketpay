package com.dailycodebuffer.user.controllers;

import com.dailycodebuffer.user.dto.PersonalDetailsDto;
import com.dailycodebuffer.user.dto.UserDto;
import com.dailycodebuffer.user.service.PersonalDetailsService;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PersonalDetailsControllerTest {

    @Mock
    private PersonalDetailsService personalDetailsService;

    @InjectMocks
    private PersonalDetailsController personalDetailsController;


    @Test
    public void testFindAllDetails() {
        MockitoAnnotations.initMocks(this);

        PersonalDetailsDto detail1 = new PersonalDetailsDto(
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
                        new BigInteger("1234567891"),
                        "91"
                )
        );
        PersonalDetailsDto detail2 = new PersonalDetailsDto(1,
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
                        new BigInteger("1234567891"),
                        "91"
                ));
        List<PersonalDetailsDto> detailsList = Arrays.asList(detail1, detail2);

        when(personalDetailsService.getAllPersonalDetails()).thenReturn(detailsList);

        ResponseEntity<List<PersonalDetailsDto>> response = personalDetailsController.findAllDetails();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(detailsList, response.getBody());

        verify(personalDetailsService, times(1)).getAllPersonalDetails();
        verifyNoMoreInteractions(personalDetailsService);
    }

    @Test
    public void testSavePersonalDetails() {
        MockitoAnnotations.initMocks(this);
        PersonalDetailsDto inputDto = new PersonalDetailsDto(1,
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
                        new BigInteger("1234567891"),
                        "91"
                ));
        PersonalDetailsDto savedDto = new PersonalDetailsDto(1,
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
                        new BigInteger("1234567891"),
                        "91"
                ));

        when(personalDetailsService.savePersonalDetail(inputDto)).thenReturn(savedDto);

        ResponseEntity<PersonalDetailsDto> response = personalDetailsController.savePersonalDetails(inputDto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedDto, response.getBody());

        verify(personalDetailsService, times(1)).savePersonalDetail(inputDto);
        verifyNoMoreInteractions(personalDetailsService);
    }
}
