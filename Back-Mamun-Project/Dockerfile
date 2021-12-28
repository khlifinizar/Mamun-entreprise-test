FROM adoptopenjdk/openjdk8:alpine-jre
ADD target/Mamun-Project-Test-0.0.1-SNAPSHOT.war
RUN mkdir -p /filedir
ENTRYPOINT ["java","-jar","app.jar"]