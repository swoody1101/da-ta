package com.da_ta.backend.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Set;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class RedisUtil {

    @Autowired
    private StringRedisTemplate redisTemplate;

    private static StringRedisTemplate staticRedisTemplate;

    @PostConstruct
    private void initStatic() {
        staticRedisTemplate = this.redisTemplate;
    }

    public static Set<String> getSet(String key) {
        return staticRedisTemplate.opsForSet()
                .members(key);
    }

    public static void createSet(String key, String[] value) {
        staticRedisTemplate.opsForSet()
                .add(key, value);
    }
}
