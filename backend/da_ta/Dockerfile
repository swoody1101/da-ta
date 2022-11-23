#FROM openjdk:8-jdk-alpine AS builder
FROM openjdk:8 AS builder
#FROM koosiedemoer/netty-tcnative-alpine
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x /gradlew
RUN ./gradlew bootJar
RUN pwd
RUN ls -la
RUN ls -la /src/main/resources/
#FROM openjdk:8-jdk-alpine
FROM openjdk:8
#RUN docker login
#FROM koosiedemoer/netty-tcnative-alpine
COPY --from=builder build/libs/da_ta-0.0.1-SNAPSHOT.jar app.jar
ARG ENVIRONMENT
ENV GOOGLE_APPLICATION_CREDENTIALS={GOOGLE_API_KEY}
ENTRYPOINT ["java","-jar","/app.jar"]