FROM desertbit/golang-gb:alpine

RUN set -ex \
	&& apk add --no-cache docker bash nodejs \
	&& npm install -g gulp