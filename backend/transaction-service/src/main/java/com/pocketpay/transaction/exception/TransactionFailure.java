package com.pocketpay.transaction.exception;

public class TransactionFailure extends RuntimeException {
    public TransactionFailure(String message) {
        super(message);
    }

    public TransactionFailure(String message, Throwable cause) {
        super(message, cause);
    }
}
