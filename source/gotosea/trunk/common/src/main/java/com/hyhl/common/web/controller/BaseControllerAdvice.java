package com.hyhl.common.web.controller;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.web.WebResponse;


/*
 * 通用异常处理类
 */
@ControllerAdvice
public class BaseControllerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(BaseBusinessException.class)
    @ResponseBody
    public ResponseEntity<?> handleControllerException(HttpServletRequest request, Throwable ex) {
        BaseBusinessException exception = (BaseBusinessException)ex;
        WebResponse webResponse = new WebResponse(exception.getCode(), exception.getMessage());
        return new ResponseEntity<>(webResponse, HttpStatus.OK);
    }

    @ExceptionHandler({IllegalArgumentException.class})
    @ResponseBody
    public ResponseEntity<?> handleIllegalArgumentException(HttpServletRequest request, Throwable ex) {
        HttpStatus status = getStatus(request);
        IllegalArgumentException exception = (IllegalArgumentException)ex;
        WebResponse webResponse = new WebResponse(BaseBusinessError.PARAMETER_ERROR.getCode(), exception.getMessage());
        return new ResponseEntity<>(webResponse, status);
    }

    @ExceptionHandler({RuntimeException .class})
    @ResponseBody
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, Throwable ex) {
        HttpStatus status = getStatus(request);
        WebResponse webResponse = new WebResponse(BaseBusinessError.INTER_ERROR.getCode(),BaseBusinessError.INTER_ERROR.getMessage());
        ex.printStackTrace();
        return new ResponseEntity<>(webResponse, status);
    }
    
	@Override	
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,HttpHeaders headers,HttpStatus status,WebRequest request)  {
		Collection<FieldError> errors = ex.getBindingResult().getFieldErrors();
		//显示第一个返回对象字段的错误
		WebResponse webresponse = new WebResponse(BaseBusinessError.PARAMETER_ERROR.getCode(),errors.iterator().next().getDefaultMessage());
		return  new ResponseEntity<Object>(webresponse,headers,status);
    }
	
	@Override	
	protected ResponseEntity<Object> handleMissingPathVariable(MissingPathVariableException ex,HttpHeaders headers,HttpStatus status,WebRequest request)  {
		WebResponse webresponse = new WebResponse(BaseBusinessError.PARAMETER_ERROR.getCode(),"missing path variable " + ex.getVariableName());
		return  new ResponseEntity<Object>(webresponse,headers,status);
    }
	
	@Override	
	protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request){
		//显示第一个返回对象字段的错误
		WebResponse webresponse = new WebResponse(String.valueOf(status.value()),ex.getMessage());
		return  new ResponseEntity<Object>(webresponse,headers,status);
	}

    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return HttpStatus.valueOf(statusCode);
    }

}