package com.dailycodebuffer.user.entity;

import org.junit.jupiter.api.Test;

import java.math.BigInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserTest {

    @Test
    public void testUserEntity() {
        int id = 1;
        String email = "john@example.com";
        String password = "password";
        BigInteger phoneNumber = new BigInteger("9014328132");
        String countryCode = "1";

        User user = User.builder()
                .id(id)
                .email(email)
                .password(password)
                .phoneNumber(phoneNumber)
                .countryCode(countryCode)
                .build();

        assertEquals(id, user.getId());
        assertEquals(email, user.getEmail());
        assertEquals(password, user.getPassword());
        assertEquals(phoneNumber, user.getPhoneNumber());
        assertEquals(countryCode, user.getCountryCode());
    }
}

