FROM desertbit/golang-gb:alpine
ENV WORKSPACE /workspace
RUN set -ex \
	&& apk add --no-cache docker bash nodejs openssh \
	&& npm install -g gulp \
	&& mkdir -p $WORKSPACE

ADD . $WORKSPACE

RUN cd $WORKSPACE \
    && npm install

WORKDIR $WORKSPACE

#todo: add github config for always use ssh
#todo: add docker basicauth credentials