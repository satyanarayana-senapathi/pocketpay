package com.pockeypay.business.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "business")
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "business_name")
    private String businessName;

    @Column(name = "registered_address")
    private String registeredAddress;

    @Column(name = "registered_number")
    private Long registeredNumber;

    @Column(name = "user_id")
    private int userId;

    @ManyToOne
    @JoinColumn(name = "business_type_id")
    private BusinessType businessTypeId;
}
