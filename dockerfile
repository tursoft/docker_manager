FROM node:boron

LABEL maintainer="Muhammet Turşak"
LABEL maintainer_email="tursoft@gmail.com"
LABEL Description="\
This container is used to browse public ports of running containers under given servers. \n\
NOTE: To be able to access docker api, you should expose docker remote api. You have different options for that. \n\
\n\
Method 1: Remote Api Proxy Container: \n\
There are plentty of such containers. I can suggest following one => jarkt/docker-remote-api (https://hub.docker.com/r/jarkt/docker-remote-api/) \n\
\n\
Method 2: Enable Remote Api on Docker Engine: \n\
It is also possible to enable docker remote api by some config changes. NOTE: this process requires a docker service restart. \n\
You cna follow following steps: https://www.ivankrizsan.se/2016/05/18/enabling-docker-remote-api-on-ubuntu-16-04/ \n\
"

EXPOSE 8090

WORKDIR /usr/src/app
VOLUME ["/usr/src/app"]

ENV TRSFT_DOCKER_SERVERS '[ { "id": "localhost", "name":"localhost", "serverIp": "localhost", "apiPort":"4243" } ]'

#RUN mkdir /usr/src/app
# Install app dependencies
#COPY package.json .
COPY ./ /usr/src/app
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

 #RUN npm install

CMD [ "npm", "start", "server.js" ]