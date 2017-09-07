package com.hyhl.gotosea.core.common.function;

/**
 * @author Leslie.Lam
 * @create 2017-08-25 14:26
 **/
@FunctionalInterface
public interface Supplier<T> {

    T get() throws Exception;
}
