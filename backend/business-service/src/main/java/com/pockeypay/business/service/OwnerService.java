package com.pockeypay.business.service;

import com.pockeypay.business.dto.OwnerDto;

import java.util.List;

public interface OwnerService {
    OwnerDto save(OwnerDto ownerDto);

    List<OwnerDto> getAllOwners();

    OwnerDto updateOwner(int id, OwnerDto ownerDto);

    void deleteOwner(int id);

}
