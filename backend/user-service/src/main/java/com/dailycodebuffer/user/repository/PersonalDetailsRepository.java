package com.dailycodebuffer.user.repository;

import com.dailycodebuffer.user.entity.PersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails,Integer>{
}
