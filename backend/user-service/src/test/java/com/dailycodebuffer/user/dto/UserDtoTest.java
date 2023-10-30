package com.dailycodebuffer.user.dto;

import com.dailycodebuffer.user.dto.UserDto;
import org.junit.jupiter.api.Test;

import java.math.BigInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserDtoTest {

    @Test
    public void testUserDto() {
        int id = 1;
        String email = "john@example.com";
        String password = "password";
        BigInteger phoneNumber = new BigInteger("9014328132");
        String countryCode = "1";

        UserDto userDto = UserDto.builder()
                .id(id)
                .email(email)
                .password(password)
                .phoneNumber(phoneNumber)
                .countryCode(countryCode)
                .build();

        assertEquals(id, userDto.getId());
        assertEquals(email, userDto.getEmail());
        assertEquals(password, userDto.getPassword());
        assertEquals(phoneNumber, userDto.getPhoneNumber());
        assertEquals(countryCode, userDto.getCountryCode());
    }
}

