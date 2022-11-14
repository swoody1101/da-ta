FROM openjdk:8-jdk-alpine AS builder
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x /gradlew
RUN ./gradlew bootJar
RUN pwd
RUN ls -la
FROM openjdk:8-jdk-alpine
COPY --from=builder build/libs/da_ta-0.0.1-SNAPSHOT.jar app.jar
ARG ENVIRONMENT
ENV GOOGLE_APPLICATION_CREDENTIALS=/da-ta-368201-c65a6e7dc0b9.json
ENTRYPOINT ["java","-jar","/app.jar"]