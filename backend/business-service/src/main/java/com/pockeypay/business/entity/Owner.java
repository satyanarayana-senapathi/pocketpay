package com.pockeypay.business.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "owner")
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "country_of_residency")
    private String countryOfResidency;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private OwnerSize type;

    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business businessId;
}
