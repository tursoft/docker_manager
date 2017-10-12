![Logo](https://raw.githubusercontent.com/tursoft/docker.manager/master/assets/logos/logo.small.png)

**Docker Manager**  
https://tursoft.github.io/docker_manager/  
https://hub.docker.com/r/tursoft/docker_manager/  

[![](https://images.microbadger.com/badges/image/tursoft/docker_manager.svg)](https://microbadger.com/images/tursoft/docker_manager "Get your own image badge on microbadger.com")

**Docker Manager** is an interface to browse running endpoints exposed over public ports to outside.
It can be used to browse only local docker or it can be also used to browse multiple remote docker instances.

If you want to browser remote docker instances, you should expose docker remote api. 
You have different options for that.

**Method 1: Remote Api Proxy Container:**
There are plentty of such containers. I can suggest following one => jarkt/docker-remote-api (https://hub.docker.com/r/jarkt/docker-remote-api/)

**Method 2: Enable Remote Api on Docker Engine:**
It is also possible to enable docker remote api by some config changes. NOTE: this process requires a docker service restart.

You can follow following steps: 
https://www.ivankrizsan.se/2016/05/18/enabling-docker-remote-api-on-ubuntu-16-04/

**Docker Run Sample:**
```
docker run --name docker_manager -d -p 8090:8090 -v "/var/run/docker.sock:/var/run/docker.sock" tursoft/docker_manager:latest
```

**Docker Compose Sample:**
```
#!/bin/bash

export TRSFT_SHOW_DEBUG='false'
export TRSFT_DOCKER_SERVERS='
        [        
          { 
              "id": "server1", 
              "name": "server1", 
              "serverIp": "172.200.200.201", 
              "apiPort": "4243" 
          },
          { 
              "id": "server2", 
              "name": "server2", 
              "serverIp": "172.200.200.202", 
              "apiPort": "4243" 
          },
          { 
              "id": "server3", 
              "name": "server3", 
              "serverIp": "172.200.200.203", 
              "apiPort": "4243" 
          }
        ]
'

docker-compose -f docker-compose.yml -p docker_manager up --build  -d
```



# Screeshoots
![Screenshoot-General](https://raw.githubusercontent.com/tursoft/docker.manager/master/assets/screenshoots/docker_manager.list.png)
