package com.pockeypay.business.exception;

public class BusinessTypeNotFoundException extends RuntimeException {
    public BusinessTypeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
