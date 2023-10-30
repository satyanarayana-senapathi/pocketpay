package com.dailycodebuffer.user.controllers;

import com.dailycodebuffer.user.dto.UserDto;
import com.dailycodebuffer.user.dto.UserResponseDto;
import com.dailycodebuffer.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindAllUsers() {
        UserResponseDto user1 = new UserResponseDto();
        UserResponseDto user2 = new UserResponseDto(1, "pooja@gmail.com", new BigInteger("1234567891"), "91");
        List<UserResponseDto> usersList = Arrays.asList(user1, user2);

        when(userService.getAllUsers()).thenReturn(usersList);

        ResponseEntity<List<UserResponseDto>> response = userController.findAllUsers();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(usersList, response.getBody());

        verify(userService, times(1)).getAllUsers();
        verifyNoMoreInteractions(userService);
    }

    @Test
    public void testSaveUser() {
        UserDto inputDto = new UserDto(1, "pooja@gmail.com", "pooja@151", new BigInteger("9014328132"), "91");
        UserDto savedDto = new UserDto(1, "pooja@gmail.com", "pooja@151", new BigInteger("9014328132"), "91");

        when(userService.saveUser(inputDto)).thenReturn(savedDto);

        ResponseEntity<UserDto> response = userController.saveUser(inputDto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedDto, response.getBody());

        verify(userService, times(1)).saveUser(inputDto);
        verifyNoMoreInteractions(userService);
    }
}