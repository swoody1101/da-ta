package com.da_ta.backend.util;

import org.springframework.stereotype.Component;

@Component
public class KMPUtil {

    public static boolean KMP(String content, String pattern) {
        int[] table = makeTable(pattern);
        int contentSize = content.length();
        int patternSize = pattern.length();
        int idx = 0;
        for (int i = 0; i < contentSize; i++) {
            while (idx > 0 && content.charAt(i) != pattern.charAt(idx)) {
                idx = table[idx - 1];
            }
            if (content.charAt(i) == pattern.charAt(idx)) {
                if (idx == patternSize - 1) {
                    return true;
                } else {
                    idx += 1;
                }
            }
        }
        return false;
    }

    private static int[] makeTable(String pattern) {
        int patternSize = pattern.length();
        int[] table = new int[patternSize];
        int idx = 0;
        for (int i = 1; i < patternSize; i++) {
            while (idx > 0 && pattern.charAt(i) != pattern.charAt(idx)) {
                idx = table[idx - 1];
            }
            if (pattern.charAt(i) == pattern.charAt(idx)) {
                idx += 1;
                table[i] = idx;
            }
        }
        return table;
    }
}
