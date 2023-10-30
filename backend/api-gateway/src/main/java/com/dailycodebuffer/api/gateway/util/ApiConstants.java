package com.dailycodebuffer.api.gateway.util;

import java.util.List;

public final class ApiConstants {
    public static final List<String> OPEN_API_ENDPOINTS = List.of(
            "/users",
            "/users/getUserByEmail",
            "/users/authenticate",
            "/users/signIn",
            "/eureka"
    );

    private ApiConstants() {
    }
}
