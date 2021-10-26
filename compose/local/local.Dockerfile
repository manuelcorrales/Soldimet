FROM openjdk:11

# Install maven
RUN wget https://mirrors.estointernet.in/apache/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz
RUN tar -xvf apache-maven-3.3.9-bin.tar.gz
RUN mv apache-maven-3.3.9 /opt/
ENV M2_HOME='/opt/apache-maven-3.3.9'
ENV PATH="$M2_HOME/bin:$PATH"
RUN mvn -version


ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JHIPSTER_SLEEP=0 \
    JAVA_OPTS=""

WORKDIR /home/soldimet

CMD ["mvn"]
