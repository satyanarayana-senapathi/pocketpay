package com.dailycodebuffer.user.service;

import com.dailycodebuffer.user.dto.UserDto;
import com.dailycodebuffer.user.dto.UserResponseDto;
import com.dailycodebuffer.user.entity.User;
import com.dailycodebuffer.user.exception.InternalServerException;
import com.dailycodebuffer.user.exception.NotFoundException;
import com.dailycodebuffer.user.exception.PostException;
import com.dailycodebuffer.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;


public class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private ModelMapper modelMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        modelMapper = new ModelMapper();
    }

    @Test
    public void testGetAllUsers_Success() {
        List<User> userList = new ArrayList<>();
        userList.add(new User(1, "pooja@gmail.com", "passwor", new BigInteger("9014328132"), "91"));
        when(userRepository.findAll()).thenReturn(userList);

        List<UserResponseDto> result = userService.getAllUsers();

        assertNotNull(result);
        assertEquals(userList.size(), result.size());

        verify(userRepository, times(1)).findAll();
    }


    @Test
    public void testSaveUser_Success() {
        UserDto inputDto = new UserDto(1, "pooja@gmail.com", "pooja@151", new BigInteger("9014328132"), "91");
        User entityToSave = modelMapper.map(inputDto, User.class);
        when(userRepository.save(any(User.class))).thenReturn(entityToSave);

        UserDto result = userService.saveUser(inputDto);

        assertNotNull(result);

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    public void testSaveUser_Failure() {
        when(userRepository.save(any(User.class))).thenThrow(new RuntimeException("Mock Exception"));

        UserDto inputDto = new UserDto(/* fill with necessary details */);
        assertThrows(PostException.class, () -> userService.saveUser(inputDto));

        verify(userRepository, times(1)).save(any(User.class));
    }
}

