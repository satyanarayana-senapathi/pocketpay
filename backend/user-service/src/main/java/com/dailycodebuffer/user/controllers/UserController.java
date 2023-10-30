package com.dailycodebuffer.user.controllers;

import com.dailycodebuffer.user.dto.Auth;
import com.dailycodebuffer.user.dto.UserDto;
import com.dailycodebuffer.user.dto.UserResponseDto;
import com.dailycodebuffer.user.service.JwtService;
import com.dailycodebuffer.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> findAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<UserDto> saveUser(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.saveUser(userDto), HttpStatus.CREATED);
    }

    @GetMapping("/users/validate")
    public ResponseEntity<String> validateToken(@RequestParam("token") String token) {
        jwtService.validateToken(token);
        return ResponseEntity.ok("Token is valid");
    }

    @GetMapping("/getUserByEmail")
    public ResponseEntity<UserDto> getUserByEmail(@RequestParam("email") String email) {
        UserDto userDto = userService.getUserByEmail(email);
        return userDto != null
                ? ResponseEntity.ok(userDto)
                : ResponseEntity.notFound().build();
    }

    @PostMapping("/token")
    public String getToken(@RequestBody Auth auth) {
        if (auth.getEmail() != null && auth.getPassword() != null) {
            if (userService.getUserByEmail(auth.getEmail()) == null) {
                UserDto user = new UserDto();
                user.setEmail(auth.getEmail());
                user.setPassword(auth.getPassword());
                saveUser(user);
            }
            return jwtService.generateToken(auth.getEmail(), auth.getPassword());
        } else
            return "unable to generate token";
    }


    @PostMapping("/signIn")
    public ResponseEntity<String> signIn(@RequestBody Auth auth) {
        if (auth.getEmail() != null && auth.getPassword() != null) {
            String token = jwtService.generateToken(auth.getEmail(), auth.getPassword());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.badRequest().body("Unable to generate token. Missing email or password.");
        }
    }
}