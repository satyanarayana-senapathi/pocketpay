package com.dailycodebuffer.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PersonalDetailsDto {
    private int id;
    private String firstName;
    private String lastName;
    private String countryResidence;
    private String currentAddress;
    private String city;
    private String postalCode;
    private LocalDate dob;
    private UserDto user;
}
