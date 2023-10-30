package com.pockeypay.business.service;

import com.pockeypay.business.dto.BusinessDto;

import java.util.List;

public interface BusinessService {

    List<BusinessDto> getAllBusinesses();

    BusinessDto updateBusiness(int id, BusinessDto businessDto);

}
