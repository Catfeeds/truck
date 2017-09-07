package com.hyhl.gotosea.core.common.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.io.Serializable;
import java.util.Date;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
public class RedisService {

    @Autowired(required =false)
    private StringRedisTemplate stringRedisTemplate;

    @Autowired(required =false)
    private RedisTemplate redisTemplate;

    /**
     * put缓存永久(覆盖同key)
     * @param key 缓存key
     * @param obj 缓存对象
     */
    public  void putObject(final String key,final Object obj){
        putObject(key, obj,0);
    }

    /**
     * put缓存(覆盖同key)
     * @param key 缓存key
     * @param obj 缓存对象
     * @param timeout 有效时间(单位:秒)
     */
    public  void putObject(final String key,final Object obj,long timeout){
        Assert.hasLength(key, "缓存key不能为空");
        Assert.notNull(obj,"缓存obj不能为空");
        boolean b = obj instanceof Serializable;
        if(!b) throw new IllegalArgumentException("缓存obj必须实现Serializable接口");
        if(timeout<=0){
            redisTemplate.opsForValue().set(key, obj);
        }else{
            redisTemplate.opsForValue().set(key, obj, timeout, TimeUnit.SECONDS);
        }

    }

    /**
     * del缓存
     * @param key 缓存key
     */
    public  void delObject(final String key){
        Assert.hasLength(key, "缓存key不能为空");
        redisTemplate.delete(key);
    }

    /**
     * 获取缓存值
     * @param key 缓存key
     * @return obj
     */
    public  Object getObject(String key){
        return redisTemplate.opsForValue().get(key);
    }

    public void set(final String key,final String value){
        stringRedisTemplate.opsForValue().set(key,value);
    }

    public void set(final String key,final String value,final Integer timeout){
        stringRedisTemplate.opsForValue().set(key,value,timeout);
    }

    public String get(final String key){
        return stringRedisTemplate.opsForValue().get(key);
    }

    public void del(final String key){
        stringRedisTemplate.delete(key);
    }

    public boolean expire(final String key,final Date date){
        return stringRedisTemplate.expireAt(key,date);
    }

    public Long pttl(final String key){
        return stringRedisTemplate.getExpire(key);
    }

    public Set<String> keys(final String pattern){
        return stringRedisTemplate.keys(pattern);
    }

    public Object hget(final String key,final String field){
        return stringRedisTemplate.opsForHash().get(key,field);
    }

    public Map<Object,Object> hgetAll(final String key){
        return stringRedisTemplate.opsForHash().entries(key);
    }

    public Long hdel(final String key,final Object...fields){
        return stringRedisTemplate.opsForHash().delete(key,fields);
    }

    public void hset(final String key,final String field,final Object value){
        stringRedisTemplate.opsForHash().put(key,field,value);
    }

    public String type(final String key){
        return stringRedisTemplate.type(key).name();
    }

    public Set<Object> hkeys(final String key){
        return stringRedisTemplate.opsForHash().keys(key);
    }

    public Long sadd(final String key,final String... values){
        return stringRedisTemplate.opsForSet().add(key,values);
    }

    public Long srem(final String key,final Object... values){
        return stringRedisTemplate.opsForSet().remove(key,values);
    }

    public Set<String> smembers(final String key){
        return stringRedisTemplate.opsForSet().members(key);
    }
}
