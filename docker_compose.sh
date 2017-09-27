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