package com.dailycodebuffer.user.dto;

import org.junit.jupiter.api.Test;

import java.math.BigInteger;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PersonalDetailsDtoTest {

    @Test
    public void testPersonalDetailsDto() {
        int id = 1;
        String firstName = "John";
        String lastName = "Doe";
        String countryResidence = "USA";
        String currentAddress = "123 Main St";
        String city = "New York";
        String postalCode = "10001";
        LocalDate dob = LocalDate.of(1990, 1, 1);

        UserDto userDto = UserDto.builder()
                .id(100)
                .email("john@example.com")
                .password("password")
                .phoneNumber(new BigInteger("9014328132"))
                .countryCode("1")
                .build();

        PersonalDetailsDto personalDetailsDto = PersonalDetailsDto.builder()
                .id(id)
                .firstName(firstName)
                .lastName(lastName)
                .countryResidence(countryResidence)
                .currentAddress(currentAddress)
                .city(city)
                .postalCode(postalCode)
                .dob(dob)
                .user(userDto)
                .build();

        assertEquals(id, personalDetailsDto.getId());
        assertEquals(firstName, personalDetailsDto.getFirstName());
        assertEquals(lastName, personalDetailsDto.getLastName());
        assertEquals(countryResidence, personalDetailsDto.getCountryResidence());
        assertEquals(currentAddress, personalDetailsDto.getCurrentAddress());
        assertEquals(city, personalDetailsDto.getCity());
        assertEquals(postalCode, personalDetailsDto.getPostalCode());
        assertEquals(dob, personalDetailsDto.getDob());
        assertEquals(userDto, personalDetailsDto.getUser());
    }
}
