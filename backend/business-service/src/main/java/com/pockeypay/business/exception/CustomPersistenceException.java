package com.pockeypay.business.exception;

import javax.persistence.PersistenceException;

public class CustomPersistenceException extends PersistenceException {
    public CustomPersistenceException(String message, Throwable cause) {
        super(message, cause);
    }
}
