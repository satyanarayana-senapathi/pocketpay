package com.pocketpay.transaction.exception;

public class TransactionException extends RuntimeException{
    public TransactionException(String message, Throwable cause) {
        super(message, cause);
    }

    public TransactionException(String message) {
        super(message);
    }

    public TransactionException(Throwable cause) {
        super(cause);
    }
}

