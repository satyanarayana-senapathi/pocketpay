package com.dailycodebuffer.api.gateway.filter;


import com.dailycodebuffer.api.gateway.util.ApiConstants;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    public static final List<String> openApiEndpoints = List.of(
            "/users",
            "/users/",
            "/users/token",
            "/users/signIn",
            "/eureka"
    );
    public static final Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().equals(uri));

    private RouteValidator() {
    }
}
