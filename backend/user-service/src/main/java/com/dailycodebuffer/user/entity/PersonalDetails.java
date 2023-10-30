package com.dailycodebuffer.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "personal_details")
public class PersonalDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String lastName;
    private String countryResidence;
    private String currentAddress;
    private String city;
    private String postalCode;
    private LocalDate dob;
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;
}
