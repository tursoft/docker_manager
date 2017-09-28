FROM node:boron

LABEL maintainer="Muhammet Turşak"
LABEL maintainer_email="tursoft@gmail.com"
LABEL Description="\
This container is used to browse public ports of running containers under given servers. \
NOTE: To be able to access docker api, you should expose docker remote api. You have different options for that. \
\
Method 1: Remote Api Proxy Container: \
There are plentty of such containers. I can suggest following one => jarkt/docker-remote-api (https://hub.docker.com/r/jarkt/docker-remote-api/) \
\
Method 2: Enable Remote Api on Docker Engine: \
It is also possible to enable docker remote api by some config changes. NOTE: this process requires a docker service restart. \
You can follow following steps: https://www.ivankrizsan.se/2016/05/18/enabling-docker-remote-api-on-ubuntu-16-04/ \
"

# expose ports ==================
EXPOSE 8090

# set working folder ==================
WORKDIR /usr/src/app
VOLUME ["/usr/src/app"]

# set variables ==================
ENV TRSFT_DOCKER_SERVERS '[ { "id": "localhost", "name":"localhost", "serverIp": "localhost", "apiPort":"4243" } ]'

# copy node app to image ==================
COPY ./src /usr/src/app

RUN echo "copy operation of app folder completed"

RUN ls -la


# restore npm modules ==================
ADD ./src/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /usr/src/app/

RUN echo "copy operation of node_modules folder completed"
RUN ls -la

WORKDIR /usr/src/app

# start app ==================
RUN echo "starting the application"
CMD [ "npm", "start", "server.js" ]