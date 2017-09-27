#!/bin/bash
export TRSFT_SHOW_DEBUG='true'
export TRSFT_DOCKER_SERVERS=''

docker-compose -f docker-compose.yml -p docker_manager up --build  -d