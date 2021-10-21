FROM centos:7.9.2009

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 

ADD jdk-11.0.12_linux-x64_bin.tar.gz /usr/local/java
COPY mcl /usr/local/mirai/mcl
COPY init_script /init_script
ENV JAVA_HOME /usr/local/java/jdk-11.0.12
ENV PATH $JAVA_HOME/bin:$PATH
ENTRYPOINT ["sh","/init_script/init.sh"]

VOLUME /tmp