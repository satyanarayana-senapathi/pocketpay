package com.pockeypay.business.dto;

import com.pockeypay.business.entity.BusinessSize;
import com.pockeypay.business.entity.BusinessType;
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
public class BusinessTypeDto {
    private int id;
    private String category;
    private String subCategory;
    private BusinessSize businessSize;
}
