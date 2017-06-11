FROM coolq/wine-coolq
LABEL maintainer "bdbaiapp@163.com"

ENV S6_KEEP_ENV 1
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - \
  && sudo apt-get install -y nodejs

ADD ./s6/run /etc/services.d/kobirt/run
ADD ./s6/200-setup-kobirt /etc/cont-init.d/200-setup-kobirt
ENV NODE_ENV production

VOLUME /home/user

