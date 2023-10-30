package com.pockeypay.business.dto;

import com.pockeypay.business.entity.Business;
import com.pockeypay.business.entity.Owner;
import com.pockeypay.business.entity.OwnerSize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OwnerDto {
    private int id;
    private String firstName;
    private String lastName;
    private String countryOfResidency;
    private Date dob;
    private OwnerSize type;
    private int businessId;
}
