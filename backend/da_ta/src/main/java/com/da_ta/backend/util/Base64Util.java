package com.da_ta.backend.util;

import java.util.Base64;

public class Base64Util {

    private static final String BASE_64_PREFIX = "data:image/png;base64,";

    public static byte[] decodeBase64ToBytes(String imageString) {
        if (imageString.startsWith(BASE_64_PREFIX))
            return Base64.getDecoder().decode(imageString.substring(BASE_64_PREFIX.length()));
        else
            throw new IllegalStateException("it is not base 64 string");
    }
}
