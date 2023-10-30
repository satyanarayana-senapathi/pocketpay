package com.dailycodebuffer.user.service;

import com.dailycodebuffer.user.dto.UserDto;
import com.dailycodebuffer.user.dto.UserResponseDto;
import com.dailycodebuffer.user.entity.User;
import com.dailycodebuffer.user.exception.InternalServerException;
import com.dailycodebuffer.user.exception.NotFoundException;
import com.dailycodebuffer.user.exception.PostException;
import com.dailycodebuffer.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    private ModelMapper modelMapper;

    public UserServiceImpl() {
        modelMapper = new ModelMapper();
    }

    @Override
    public List<UserResponseDto> getAllUsers() {

        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserResponseDto.class)).collect(Collectors.toList());

    }

    @Override
    public UserDto saveUser(UserDto userDto) {
        try {
            User user = modelMapper.map(userDto, User.class);
            User savedUser = userRepository.save(user);
            return modelMapper.map(savedUser, UserDto.class);
        } catch (Exception e) {
            throw new PostException("Failed to create user");
        }
    }

    @Override
    public UserDto getUserByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            return convertToDto(userOptional.get());
        } else {
            return null;
        }
    }

    private UserDto convertToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }


}
