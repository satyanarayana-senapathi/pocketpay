package com.dailycodebuffer.user.exception;

public class PostException extends RuntimeException{
    public PostException(String message,Throwable cause){
        super(message,cause);
    }
    public PostException(String message){
        super(message);
    }
    public PostException(Throwable cause){
        super(cause);
    }

}
