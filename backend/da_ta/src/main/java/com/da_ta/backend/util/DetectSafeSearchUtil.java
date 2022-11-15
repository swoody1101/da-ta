package com.da_ta.backend.util;

import com.da_ta.backend.common.domain.exception.CommonException;
import com.da_ta.backend.letter.controller.dto.common.CheckImageLetterResponse;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.da_ta.backend.common.domain.ErrorCode.IMAGE_LETTER_CHECK_FAILED;

@Slf4j
@Component
public class DetectSafeSearchUtil {

    public static final String DETECTED_ADULT = "성인용 콘텐츠";
    public static final String DETECTED_SPOOF = "스푸핑";
    public static final String DETECTED_MEDICAL = "의료 이미지";
    public static final String DETECTED_VIOLENCE = "폭력적인 콘텐츠";
    public static final String DETECTED_RACY = "선정적인 콘텐츠";
    public static final String NO_ISSUE = "유해성 검사에 통과하였습니다.";

    public static CheckImageLetterResponse detectSafeSearch(byte[] imageDataUrl) throws IOException {
        List<AnnotateImageRequest> requests = new ArrayList<>();
        ByteString imgBytes = ByteString.copyFrom(imageDataUrl);
        Image img = Image.newBuilder()
                .setContent(imgBytes)
                .build();
        Feature feat = Feature.newBuilder()
                .setType(Feature.Type.SAFE_SEARCH_DETECTION)
                .build();
        AnnotateImageRequest request = AnnotateImageRequest.newBuilder()
                .addFeatures(feat)
                .setImage(img)
                .build();
        requests.add(request);
        try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();
            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    log.info("Error: " + res.getError().getMessage());
                    throw new CommonException(IMAGE_LETTER_CHECK_FAILED);
                }
                return checkImage(res.getSafeSearchAnnotation());
            }
        } catch (IOException ioException) {
            throw new IOException(ioException.getMessage());
        }
        throw new CommonException(IMAGE_LETTER_CHECK_FAILED);
    }

    private static CheckImageLetterResponse checkImage(SafeSearchAnnotation annotation) {
        Boolean harmfulness;
        String message;
        if (annotation.getAdult().getNumber() >= Likelihood.POSSIBLE_VALUE) {
            harmfulness = true;
            message = DETECTED_ADULT;
        } else if (annotation.getMedical().getNumber() >= Likelihood.POSSIBLE_VALUE) {
            harmfulness = true;
            message = DETECTED_MEDICAL;
        } else if (annotation.getSpoof().getNumber() >= Likelihood.POSSIBLE_VALUE) {
            harmfulness = true;
            message = DETECTED_SPOOF;
        } else if (annotation.getViolence().getNumber() >= Likelihood.POSSIBLE_VALUE) {
            harmfulness = true;
            message = DETECTED_VIOLENCE;
        } else if (annotation.getRacy().getNumber() >= Likelihood.POSSIBLE_VALUE) {
            harmfulness = true;
            message = DETECTED_RACY;
        } else {
            harmfulness = false;
            message = NO_ISSUE;
        }
        return CheckImageLetterResponse.builder()
                .isHarmful(harmfulness)
                .message(message)
                .build();
    }
}
