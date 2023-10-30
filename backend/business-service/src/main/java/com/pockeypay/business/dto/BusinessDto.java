package com.pockeypay.business.dto;

import com.pockeypay.business.entity.Business;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusinessDto {

    private int id;
    private String businessName;
    private String registeredAddress;
    private int registeredNumber;
    private int businessTypeId;
    private int userId;

}
