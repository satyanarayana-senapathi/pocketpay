package com.dailycodebuffer.user.entity;

import com.dailycodebuffer.user.entity.PersonalDetails;
import com.dailycodebuffer.user.entity.User;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

public class PersonalDetailsTest {

    @Test
    public void testPersonalDetailsEntity() {
        int id = 1;
        String firstName = "John";
        String lastName = "Doe";
        String countryResidence = "USA";
        String currentAddress = "123 Main St";
        String city = "New York";
        String postalCode = "10001";
        LocalDate dob = LocalDate.of(1990, 1, 1);

        User user = mock(User.class);

        PersonalDetails personalDetails = PersonalDetails.builder()
                .id(id)
                .firstName(firstName)
                .lastName(lastName)
                .countryResidence(countryResidence)
                .currentAddress(currentAddress)
                .city(city)
                .postalCode(postalCode)
                .dob(dob)
                .user(user)
                .build();

        assertEquals(id, personalDetails.getId());
        assertEquals(firstName, personalDetails.getFirstName());
        assertEquals(lastName, personalDetails.getLastName());
        assertEquals(countryResidence, personalDetails.getCountryResidence());
        assertEquals(currentAddress, personalDetails.getCurrentAddress());
        assertEquals(city, personalDetails.getCity());
        assertEquals(postalCode, personalDetails.getPostalCode());
        assertEquals(dob, personalDetails.getDob());
        assertEquals(user, personalDetails.getUser());
    }
}
