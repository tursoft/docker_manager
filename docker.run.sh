#!/bin/bash
docker run --name docker_manager -d -p 8090:8090 -v "/var/run/docker.sock:/var/run/docker.sock" tursoft/docker_manager:1.0