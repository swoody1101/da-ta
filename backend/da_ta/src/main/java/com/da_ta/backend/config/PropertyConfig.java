package com.da_ta.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("jar:../env.properties")
public class PropertyConfig {
}
