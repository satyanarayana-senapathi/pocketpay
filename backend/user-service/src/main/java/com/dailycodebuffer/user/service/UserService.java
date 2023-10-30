package com.dailycodebuffer.user.service;

import com.dailycodebuffer.user.dto.UserDto;
import com.dailycodebuffer.user.dto.UserResponseDto;
import com.dailycodebuffer.user.entity.User;

import java.util.List;

public interface UserService {
    List<UserResponseDto> getAllUsers();

    UserDto saveUser(UserDto userDto);

    UserDto getUserByEmail(String email);

}
