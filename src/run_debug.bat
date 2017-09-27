SET server1={ "id": "server1", "name":"server1", "serverIp": "172.200.200.2001", "apiPort":"4243" }
SET server1={ "id": "server2", "name":"server2", "serverIp": "172.200.200.2002", "apiPort":"4243" }

SET "TRSFT_DOCKER_SERVERS=[ %server1%, %server2% ]"
SET "TRSFT_SHOW_DEBUG=false"

nodemon --inspect ./server.js